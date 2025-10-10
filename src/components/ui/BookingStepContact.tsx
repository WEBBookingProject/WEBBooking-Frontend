// ============================================
// Файл: src/components/ui/BookingStepContact.tsx
// Компонент: BookingStepContact
// Використовується: на сторінці BookingPage (крок 2)
// Опис: Форма для введення країни та номера телефону користувача
// ============================================

import React from "react";
import "../ui/BookingStep.css";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const BookingStepContact: React.FC<Props> = ({
  formData,
  handleChange,
  handleNext,
  handleBack,
}) => {
  // Перевірка заповнення обов’язкових полів перед переходом
  const handleContinue = () => {
    if (!formData.country || !formData.phone) {
      alert("Please fill in all fields.");
      return;
    }
    handleNext();
  };

  return (
    <>
      {/* Заголовок кроку */}
      <div className="booking-step">
        <div className="step-header">
          <div className="step-left">2/3</div>
          <div className="step-center">Booking</div>
        </div>

        {/* Поля введення даних */}
        <div className="form-content">
          <div className="form-row">
            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Ukraine"
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+380 XX XXX XX XX"
              />
            </div>
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

export default BookingStepContact;
