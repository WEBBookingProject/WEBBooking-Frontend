// ============================================
// Файл: src/components/ui/BookingConfirmation.tsx
// Компонент: BookingConfirmation
// Використовується: на сторінці BookingPage після підтвердження
// Опис: Показує повідомлення про успішне бронювання з деталями
// ============================================

import React from "react";
import "../ui/BookingConfirmation.css";

interface Props {
  userName: string;
  hotelName: string;
  bookingDate: string;
  bookingTime: string;
  rating: number;
  handleClose: () => void;
}

const BookingConfirmation: React.FC<Props> = ({
  userName,
  hotelName,
  bookingDate,
  bookingTime,
  rating,
  handleClose,
}) => {
  // Відображення зірок рейтингу
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="stars-container">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star star-full">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="confirmation-page">
      {/* Верхня частина з логотипом */}
      <div className="confirmation-header">
        <div className="logo">
          <span>Hotel for </span>
          <span className="highlightCOLOR"> you.</span>
        </div>
      </div>

      {/* Подяка користувачу */}
      <div className="thank-you-section">
        <p className="thank-you">Thank you {userName}!</p>
        <p className="confirmation-msg">Your booking has been successfully confirmed!</p>
      </div>

      {/* Деталі бронювання */}
      <ul className="booking-details">
        <li>{hotelName} is waiting for you</li>
        <li>The payment for the booking is made upon arrival at the hotel.</li>
        <li>You can cancel your booking free of charge until {bookingDate} {bookingTime}</li>
        <li>
          Get in touch with the manager for <span className="highlight">canceling the booking</span> or for <span className="highlight">any queries</span>
        </li>
      </ul>

      {/* Кнопка для збереження PDF */}
      <div className="pdf-button-wrapper">
        <button className="btn-pdf">Save as PDF</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
