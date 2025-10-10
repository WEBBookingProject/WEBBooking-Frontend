// ============================================
// Файл: src/components/ui/BookingStepPayment.tsx
// Компонент: BookingStepPayment
// Використовується: третій крок бронювання (оплата)
// Опис: Форма введення платіжних даних і підтвердження бронювання
// ============================================

import React from "react";
import "../ui/BookingStep.css";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const BookingStepPayment: React.FC<Props> = ({ formData, handleChange, handleBack, handleSubmit }) => {
  const handleComplete = () => {
    if (
      !formData.cardType ||
      !formData.cardNumber ||
      !formData.expiryMonth ||
      !formData.expiryYear ||
      !formData.cvv ||
      !formData.agreeToTerms
    ) {
      alert("Please fill in all fields and agree to the booking terms and privacy policy.");
      return;
    }
    handleSubmit();
  };

  return (
    <>
      <div className="booking-step">
        {/* Заголовок кроку */}
        <div className="step-header">
          <div className="step-left">3/3</div>
          <div className="step-center">Booking</div>
        </div>

        {/* Поля форми оплати */}
        <div className="form-content">
          <div className="form-group">
            <label>Card Type *</label>
            <select name="cardType" value={formData.cardType} onChange={handleChange}>
              <option value="" disabled hidden>Select card type</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>

          {/* Ряд полів: термін дії та CVV */}
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Month (MM) *</label>
              <input
                type="text"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                required
                placeholder="MM"
                maxLength={2}
              />
            </div>
            <div className="form-group">
              <label>Expiry Year (YY) *</label>
              <input
                type="text"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                required
                placeholder="YY"
                maxLength={2}
              />
            </div>
            <div className="form-group">
              <label>CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Підтвердження згоди */}
      <div className="booking-checkbox-wrapper">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          I agree to the booking terms and privacy policy *
        </label>
      </div>

      {/* Кнопка завершення бронювання */}
      <div className="booking-button-wrapper">
        <button type="button" onClick={handleComplete} className="btn-continue">
          Complete the booking
        </button>
      </div>
    </>
  );
};

export default BookingStepPayment;