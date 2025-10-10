// ============================================
// Файл: src/components/ui/BookingStepPersonal.tsx
// Компонент: BookingStepPersonal
// Використовується: перший крок бронювання
// Опис: Форма введення особистих даних користувача
// ============================================

import React from "react";
import "../ui/BookingStep.css";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNext: () => void;
}

const BookingStepPersonal: React.FC<Props> = ({ formData, handleChange, handleNext }) => {
  const handleContinue = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all fields.");
      return;
    }
    handleNext();
  };

  return (
    <>
      <div className="booking-step">
        {/* Заголовок кроку */}
        <div className="step-header">
          <div className="step-left">1/3</div>
          <div className="step-center">Booking</div>
        </div>

        {/* Поля введення особистих даних */}
        <div className="form-content">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
            />
          </div>
        </div>
      </div>

      {/* Кнопка переходу на наступний крок */}
      <div className="booking-button-wrapper">
        <button type="button" onClick={handleContinue} className="btn-continue">
          Continue
        </button>
      </div>
    </>
  );
};

export default BookingStepPersonal;