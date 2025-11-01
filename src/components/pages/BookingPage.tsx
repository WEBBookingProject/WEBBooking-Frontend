import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BookingInfoPanel from "../ui/BookingInfoPanel";
import BookingStepPersonal from "../ui/BookingStepPersonal";
import BookingStepContact from "../ui/BookingStepContact";
import BookingStepPayment from "../ui/BookingStepPayment";
import BookingConfirmation from "../ui/BookingConfirmation";
import Header from "../layouts/HeaderDetails";
import { getHotelById, createBooking } from "../../services/hotelService";
import { HotelView } from "../../models/HotelView";
import "./BookingPage.css";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  country: string;
  phone: string;
  cardType: string;
  cardNumber: string;
  expiry: string;
  agreeToTerms: boolean;
}

interface LocationState {
  roomName: string;
  hotelName: string;
  price: number;
  propertyId: string;
  hotelImages?: string[];
  roomIndex?: number;
  rating?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [state, setState] = useState<LocationState | null>(null);
  const [hotel, setHotel] = useState<HotelView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    country: "",
    phone: "",
    cardType: "",
    cardNumber: "",
    expiry: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Дефолтні дати: сьогодні + 7 днів на 3 ночі
        const defaultCheckIn = new Date();
        defaultCheckIn.setDate(defaultCheckIn.getDate() + 7);
        const defaultCheckOut = new Date(defaultCheckIn);
        defaultCheckOut.setDate(defaultCheckOut.getDate() + 3);
        
        if (location.state) {
          const locationState = location.state as LocationState;
          
          // Дефолтні дати
          setState({
            ...locationState,
            checkInDate: locationState.checkInDate || defaultCheckIn.toISOString(),
            checkOutDate: locationState.checkOutDate || defaultCheckOut.toISOString(),
          });
          
          if (id) {
            const hotelData = await getHotelById(id);
            setHotel(hotelData);
          }
        } else if (id) {
          const hotelData = await getHotelById(id);
          setHotel(hotelData);
          
          setState({
            roomName: "Standard Room",
            hotelName: hotelData.name,
            price: hotelData.priceForDay,
            propertyId: hotelData.id,
            hotelImages: hotelData.photos,
            roomIndex: 0,
            rating: hotelData.rating,
            checkInDate: defaultCheckIn.toISOString(),
            checkOutDate: defaultCheckOut.toISOString(),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);

  const handleSubmit = async () => {
    if (!state) {
      alert("Booking information is missing");
      return;
    }

    try {
      setSubmitting(true);

      // Підготовка даних для відправки
      const bookingData = {
        propertyId: state.propertyId,
        totalPrice: state.price,
        startDate: state.checkInDate!,
        endDate: state.checkOutDate!,
        status: 0,
        userId: "", 
        clientId: "", 
      };
      
      console.log("Sending booking data:", {
        ...bookingData,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: formData.country,
          phone: formData.phone,
        }
      });
      
      // Відправка на сервер
      await createBooking(bookingData);
      
      console.log("Booking created successfully!");
      setBookingConfirmed(true);
      setSubmitting(false);
    } catch (err: any) {
      console.error("Error submitting booking:", err);
      setSubmitting(false);
      alert(`Failed to create booking: ${err.message || "Please try again."}`);
    }
  };

  const handleCloseConfirmation = () => {
    if (id) {
      navigate(`/hotel/${id}`);
    } else {
      navigate("/search");
    }
  };

  const handleClose = () => {
    if (id) {
      navigate(`/hotel/${id}`);
    } else {
      navigate("/search");
    }
  };

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

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading">Loading booking information...</div>
      </>
    );
  }

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

  return (
    <>
      <Header />
      <div className="booking-page" style={{ position: "relative" }}>
        <button
          onClick={handleClose}
          className="close-button"
          aria-label="Close"
        >
          ×
        </button>

        {!bookingConfirmed ? (
          <>
            <BookingInfoPanel
              key={`${hotelName}-${roomName}`}
              roomName={roomName}
              hotelName={hotelName}
              roomImage={hotelImages[roomIndex]}
              roomIndex={roomIndex}
            />
            <div className="booking-form-container">
              {submitting ? (
                <div className="loading">Processing your booking...</div>
              ) : (
                renderStep()
              )}
            </div>
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