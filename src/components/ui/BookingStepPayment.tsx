import React, { useState } from "react";
import "../ui/BookingStep.css";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
}

const BookingStepPayment: React.FC<Props> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [errors, setErrors] = useState({
    cardType: false,
    cardNumber: false,
    expiry: false,
    agreeToTerms: false,
  });

  const handleComplete = () => {
    const newErrors = {
      cardType: !formData.cardType,
      cardNumber: !formData.cardNumber,
      expiry: !formData.expiry,
      agreeToTerms: !formData.agreeToTerms,
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some((v) => v)) handleSubmit();
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    handleChange({
      ...e,
      target: { ...e.target, name: "expiry", value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <div className="booking-step">
        <div className="step-header">
          <div className="step-left">3/3</div>
          <div className="step-center">Booking</div>
        </div>

        <div className="form-narrow payment-fields" >
          <div className={`form-group ${errors.cardType ? "has-error" : ""}`}>
            <select name="cardType" value={formData.cardType} onChange={handleChange}>
              <option value="" disabled hidden>
                Select card type
              </option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
            <p className="form-hint-inline">No card?</p>
          </div>

          <div className={`form-group ${errors.cardNumber ? "has-error" : ""}`}>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
            <p className="form-hint-inline">Required to confirm your booking</p>
          </div>

          <div className={`form-group ${errors.expiry ? "has-error" : ""}`}>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
        </div>
      </div>

      <div className="booking-checkbox-wrapper">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          I agree to the <a href="#">general booking</a> conditions and{" "} <a href="#">privacy policy</a> </label>
      </div>

      <div className="booking-button-wrapper" style={{ flexDirection: "column", gap: "12px" }}>
        <button type="button" onClick={handleComplete} className="btn-continue">
          COMPLETE THE BOOKING
        </button>
        <button type="button" className="btn-outline">
          Check the data before submitting
        </button>
      </div>
    </>
  );
};

export default BookingStepPayment;
