// ============================================
// Файл: src/components/pages/BookingPage.tsx
// Компонент: BookingPage
// Використовується: для оформлення бронювання вибраного номера
// Опис: Містить кроки бронювання (особисті дані, контакти, оплата) та підтвердження
// ============================================

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BookingInfoPanel from "../ui/BookingInfoPanel";
import BookingStepPersonal from "../ui/BookingStepPersonal";
import BookingStepContact from "../ui/BookingStepContact";
import BookingStepPayment from "../ui/BookingStepPayment";
import BookingConfirmation from "../ui/BookingConfirmation";
import Header from "../layouts/HeaderDetails";
import { getHotelById } from "../../services/hotelService";
import { HotelView } from "../../models/HotelView";
import "./BookingPage.css";

// Дані форми бронювання
interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  cardType: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  agreeToTerms: boolean;
}

// Стан сторінки з даними про номер
interface LocationState {
  roomName: string;
  hotelName: string;
  price: number;
  propertyId: string;
  hotelImages?: string[];
  roomIndex?: number;
  rating?: number;
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Стан для збереження даних
  const [state, setState] = useState<LocationState | null>(null);
  const [hotel, setHotel] = useState<HotelView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    cardType: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    agreeToTerms: false,
  });

  // Завантаження даних з сервера
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Отримуємо стан з навігації
        if (location.state) {
          const locationState = location.state as LocationState;
          setState(locationState);
          
          // Завантажуємо повні дані готелю з сервера
          if (id) {
            const hotelData = await getHotelById(id);
            setHotel(hotelData);
          }
        } else if (id) {
          // Якщо немає state, завантажуємо з сервера
          const hotelData = await getHotelById(id);
          setHotel(hotelData);
          
          // Створюємо базовий state
          setState({
            roomName: "Standard Room",
            hotelName: hotelData.name,
            price: hotelData.priceForDay,
            propertyId: hotelData.id,
            hotelImages: hotelData.photos,
            roomIndex: 0,
            rating: hotelData.rating,
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading booking data:", err);
        setError("Failed to load booking information");
        setLoading(false);
      }
    };

    loadData();
  }, [location.state, id]);

  // Зміна значень у формі
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Навігація між кроками
  const handleNext = () => setCurrentStep(prev => prev + 1);

  // Підтвердження бронювання
  const handleSubmit = async () => {
    try {
      // Тут можна додати відправку даних на сервер
      const bookingData = {
        ...formData,
        roomName: state?.roomName,
        hotelName: state?.hotelName,
        propertyId: state?.propertyId,
        price: state?.price,
        roomIndex: state?.roomIndex,
      };
      
      console.log("Booking data:", bookingData);
      
      setBookingConfirmed(true);
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("Failed to submit booking. Please try again.");
    }
  };

  // Закриття вікна підтвердження і повернення на сторінку готелю
  const handleCloseConfirmation = () => {
    if (id) {
      navigate(`/hotel/${id}`);
    } else {
      navigate("/search");
    }
  };

  // Кнопка повернення на сторінку готелю
  const handleClose = () => {
    if (id) {
      navigate(`/hotel/${id}`);
    } else {
      navigate("/search");
    }
  };

  // Рендер потрібного кроку форми
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingStepPersonal
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <BookingStepContact
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <BookingStepPayment
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // Відображення стану завантаження
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading">Loading booking information...</div>
      </>
    );
  }

  // Відображення помилки
  if (error || !state) {
    return (
      <>
        <Header />
        <div className="error-message">
          <p>{error || "Failed to load booking information"}</p>
          <button onClick={() => navigate("/search")}>Return to Search</button>
        </div>
      </>
    );
  }

  const { roomName, hotelName, hotelImages = [], roomIndex = 0, rating } = state;

  // Основна структура сторінки
  return (
    <>
      <Header />
      <div className="booking-page" style={{ position: "relative" }}>
        {/* Кнопка повернення до готелю */}
        <button
          onClick={handleClose}
          className="close-button"
          aria-label="Close"
        >
          ×
        </button>

        {/* Панель бронювання або підтвердження */}
        {!bookingConfirmed ? (
          <>
            <BookingInfoPanel
              key={`${hotelName}-${roomName}`}
              roomName={roomName}
              hotelName={hotelName}
              roomImage={hotelImages[roomIndex]}
              roomIndex={roomIndex}
            />
            <div className="booking-form-container">{renderStep()}</div>
          </>
        ) : (
          <BookingConfirmation
            userName={formData.firstName}
            hotelName={hotelName}
            rating={rating ?? 0}
            bookingDate={new Date().toLocaleDateString()}
            bookingTime={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            handleClose={handleCloseConfirmation}
          />
        )}
      </div>
    </>
  );
};

export default BookingPage;