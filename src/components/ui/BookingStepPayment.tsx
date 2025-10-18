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

  const [errorMessages, setErrorMessages] = useState({
    cardType: "",
    cardNumber: "",
    expiry: "",
    agreeToTerms: "",
  });

  const validateField = (name: string, value: any) => {
    let isValid = true;
    let message = "";

    switch (name) {
      case "cardType":
        if (!value) {
          isValid = false;
          message = "Оберіть тип картки";
        }
        break;
      case "cardNumber":
        const cleanNumber = value.replace(/\s/g, "");
        if (!value.trim()) {
          isValid = false;
          message = "The field is not filled in";
        } else if (cleanNumber.length !== 16 || !/^\d+$/.test(cleanNumber)) {
          isValid = false;
          message = "Номер картки повинен містити 16 цифр";
        }
        break;
      case "expiry":
        if (!value.trim()) {
          isValid = false;
          message = "The field is not filled in";
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          isValid = false;
          message = "Формат повинен бути MM/YY";
        }
        break;
      case "agreeToTerms":
        if (!value) {
          isValid = false;
          message = "Необхідно прийняти умови";
        }
        break;
    }

    return { isValid, message };
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    handleChange(e);

    if (errors[name as keyof typeof errors]) {
      const validation = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, [name]: validation.message }));
    }
  };

  const handleComplete = () => {
    const newErrors: any = {};
    const newMessages: any = {};

    const fields = {
      cardType: formData.cardType,
      cardNumber: formData.cardNumber,
      expiry: formData.expiry,
      agreeToTerms: formData.agreeToTerms,
    };

    Object.entries(fields).forEach(([field, value]) => {
      const validation = validateField(field, value || "");
      newErrors[field] = !validation.isValid;
      newMessages[field] = validation.message;
    });

    setErrors(newErrors);
    setErrorMessages(newMessages);

    if (!Object.values(newErrors).some((v) => v)) handleSubmit();
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    
    const newEvent = {
      ...e,
      target: { ...e.target, name: "expiry", value },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(newEvent);

    if (errors.expiry) {
      const validation = validateField("expiry", value);
      setErrors((prev) => ({ ...prev, expiry: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, expiry: validation.message }));
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || value;
    
    const newEvent = {
      ...e,
      target: { ...e.target, name: "cardNumber", value },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleFieldChange(newEvent);
  };

  return (
    <>
      <div className="booking-step">
        <div className="step-header">
          <div className="step-left">3/3</div>
          <div className="step-center">Booking</div>
        </div>

        <div className="form-narrow payment-fields">
          <div className={`form-group ${errors.cardType ? "has-error" : ""}`}>
            <select name="cardType" value={formData.cardType} onChange={handleFieldChange}>
              <option value="" disabled hidden>
                Select card type
              </option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
            <p className="form-hint-inline">No card?</p>
            {errors.cardType && (
              <span className="error-bubble">{errorMessages.cardType}</span>
            )}
          </div>

          <div className={`form-group ${errors.cardNumber ? "has-error" : ""}`}>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
            <p className="form-hint-inline">Required to confirm your booking</p>
            {errors.cardNumber && (
              <span className="error-bubble">{errorMessages.cardNumber}</span>
            )}
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
            {errors.expiry && (
              <span className="error-bubble">{errorMessages.expiry}</span>
            )}
          </div>
        </div>
      </div>

      <div className={`booking-checkbox-wrapper ${errors.agreeToTerms ? "has-error-checkbox" : ""}`}>
        <label className="custom-checkbox">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleFieldChange}
          />
          I agree to the <a href="#">general booking</a> conditions and{" "}
          <a href="#">privacy policy</a>
        </label>
        {errors.agreeToTerms && (
          <span className="error-bubble checkbox-error">{errorMessages.agreeToTerms}</span>
        )}
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