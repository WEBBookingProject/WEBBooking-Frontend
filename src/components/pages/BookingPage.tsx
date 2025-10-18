// ============================================
// Файл: src/components/pages/BookingPage.tsx
// Компонент: BookingPage
// Використовується: для оформлення бронювання вибраного номера
// Опис: Містить кроки бронювання (особисті дані, контакти, оплата) та підтвердження
// ============================================

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingInfoPanel from "../ui/BookingInfoPanel";
import BookingStepPersonal from "../ui/BookingStepPersonal";
import BookingStepContact from "../ui/BookingStepContact";
import BookingStepPayment from "../ui/BookingStepPayment";
import BookingConfirmation from "../ui/BookingConfirmation";
import Header from "../layouts/HeaderDetails";
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
  hotelImages?: string[];
  roomIndex?: number;
  rating?: number;
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Стан для збереження даних
  const [state, setState] = useState<LocationState | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // поточний крок форми
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // стан підтвердження
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    cardType: "visa",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    agreeToTerms: false,
  });

  // Завантаження переданого стану
  useEffect(() => {
    if (location.state) setState(location.state as LocationState);
  }, [location.state]);

  // Якщо дані ще не завантажені
  if (!state) return <div className="loading">Loading...</div>;

  const { roomName, hotelName, hotelImages = [], roomIndex = 0 } = state;

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
  const handleSubmit = () => {
    // Валідація тепер повністю обробляється в BookingStepPayment,
    // тому дублююча перевірка тут не потрібна.
    console.log({ ...formData, roomName, hotelName });
    setBookingConfirmed(true);
  };

  // Закриття вікна підтвердження
  const handleCloseConfirmation = () => navigate("/search");

  // Рендер потрібного кроку форми
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BookingStepPersonal formData={formData} handleChange={handleChange} handleNext={handleNext} />;
      case 2:
        return <BookingStepContact formData={formData} handleChange={handleChange} handleNext={handleNext} />;
      case 3:
        return <BookingStepPayment formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  // Основна структура сторінки
  return (
    <>
      <Header />
      <div className="booking-page" style={{ position: "relative" }}>
        {/* Кнопка повернення до пошуку */}
        <button onClick={() => navigate("/search")} className="close-button" aria-label="Close">
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
            />
            <div className="booking-form-container">{renderStep()}</div>
          </>
        ) : (
          <BookingConfirmation
            userName={formData.firstName}
            hotelName={hotelName}
            rating={state.rating ?? 0}
            bookingDate={new Date().toLocaleDateString()}
            bookingTime={new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            handleClose={handleCloseConfirmation}
          />
        )}
      </div>
    </>
  );
};

export default BookingPage;