import React, { useState } from "react";
import "../ui/BookingStep.css";
import FormErrorBubble, { validateRequired, validateNoLetters } from "../ui/FormErrorBubble";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
}

const BookingStepPayment: React.FC<Props> = ({ formData, handleChange, handleSubmit }) => {
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

  // Перевірка поля
  const validatePaymentField = (name: string, value: string) => {
    const validators = [];

    if (name === "cardType") {
      validators.push(validateRequired(value));
    }

    if (name === "cardNumber") {
      validators.push(validateRequired(value), validateNoLetters(value));
    }

    if (name === "expiry") {
      validators.push(validateRequired(value));
    }

    if (name === "agreeToTerms") {
      if (!formData.agreeToTerms)
        return { isValid: false, message: "You must agree to continue" };
    }

    for (const check of validators) {
      if (!check.isValid) return check;
    }

    return { isValid: true, message: "" };
  };

  // Форматування дати MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    handleChange({
      ...e,
      target: { ...e.target, name: "expiry", value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Оновлення стану з перевіркою
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(e);

    if (errors[name as keyof typeof errors]) {
      const validation = validatePaymentField(name, value);
      setErrors((prev) => ({ ...prev, [name]: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, [name]: validation.message }));
    }
  };

  // Підтвердження
  const handleComplete = () => {
    const newErrors: any = {};
    const newMessages: any = {};

    ["cardType", "cardNumber", "expiry", "agreeToTerms"].forEach((field) => {
      const validation = validatePaymentField(field, formData[field] || "");
      newErrors[field] = !validation.isValid;
      newMessages[field] = validation.message;
    });

    setErrors(newErrors);
    setErrorMessages(newMessages);

    if (!Object.values(newErrors).some((v) => v)) handleSubmit();
  };

  return (
    <>
      <div className="booking-step">
        <div className="step-header">
          <div className="step-left">3/3</div>
          <div className="step-center">Booking</div>
        </div>

        <div className="form-narrow payment-fields">
          {/* Тип картки  */}
          <div className={`form-group ${errors.cardType ? "has-error" : ""}`}>
            <select name="cardType" value={formData.cardType} onChange={handleFieldChange}>
              <option value="" disabled hidden>
                Select card type
              </option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
            <p className="form-hint-inline">No card?</p>
            <FormErrorBubble message={errorMessages.cardType} show={errors.cardType} />
          </div>

          {/* Номер картки  */}
          <div className={`form-group ${errors.cardNumber ? "has-error" : ""}`}>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleFieldChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
            <p className="form-hint-inline">Required to confirm your booking</p>
            <FormErrorBubble message={errorMessages.cardNumber} show={errors.cardNumber} />
          </div>

          {/* Дата закінчення картки */}
          <div className={`form-group ${errors.expiry ? "has-error" : ""}`}>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
            />
            <FormErrorBubble message={errorMessages.expiry} show={errors.expiry} />
          </div>
        </div>
      </div>

      {/* Опції */}
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
        <FormErrorBubble message={errorMessages.agreeToTerms} show={errors.agreeToTerms} />
      </div>

      {/* Кнопка */}
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
