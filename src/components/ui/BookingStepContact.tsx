import React, { useState } from "react";
import "../ui/BookingStep.css";
import FormErrorBubble, { validateRequired, validateNoDigits, validateNoSymbols, validateNoLetters, validateLength } from "../ui/FormErrorBubble";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNext: () => void;
}

const BookingStepContact: React.FC<Props> = ({ formData, handleChange, handleNext }) => {
  const [errors, setErrors] = useState({ country: false, phone: false });
  const [errorMessages, setErrorMessages] = useState({ country: "", phone: "" });
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Універсальна перевірка поля
  const validateContactField = (name: string, value: string) => {
    const validators = [];

    if (name === "country") {
      validators.push(
        validateRequired(value),
        validateNoDigits(value),
        validateNoSymbols(value)
      );
    }

    if (name === "phone") {
      validators.push(
        validateRequired(value),
        validateNoLetters(value),
        // validateLength(value, 9, 15)
      );
    }

    for (const check of validators) {
      if (!check.isValid) return check;
    }

    return { isValid: true, message: "" };
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 16) return;

    handleChange(e);

    if (errors[name as keyof typeof errors]) {
      const validation = validateContactField(name, value);
      setErrors((prev) => ({ ...prev, [name]: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, [name]: validation.message }));
    }
  };

  const handleContinue = () => {
    const newErrors: any = {};
    const newMessages: any = {};

    ["country", "phone"].forEach((field) => {
      const validation = validateContactField(field, formData[field] || "");
      newErrors[field] = !validation.isValid;
      newMessages[field] = validation.message;
    });

    setErrors(newErrors);
    setErrorMessages(newMessages);

    if (!Object.values(newErrors).some((v) => v)) handleNext();
  };

  return (
    <>
      <div className="booking-step">
        <div className="step-header">
          <div className="step-left">2/3</div>
          <div className="step-center">Booking</div>
        </div>

        <div className="form-two-columns">
          <div className="form-left">
            {/* Країна */}
            <div className={`form-group ${errors.country ? "has-error" : ""}`}>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleFieldChange}
                placeholder="Country"
              />
              <FormErrorBubble message={errorMessages.country} show={errors.country} />
            </div>

            {/* Номер */}
            <div className={`form-group ${errors.phone ? "has-error" : ""} form-inline`}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                placeholder="Phone number"
                maxLength={16}
              />
              <p className="form-hint-inline">
                In order for administration to be able to contact you
              </p>
              <FormErrorBubble message={errorMessages.phone} show={errors.phone} />
            </div>
          </div>
        </div>
      </div>

      {/* Додаткові опції */}
      <div className="option-buttons">
        <button
          type="button"
          className={`round-option ${selected.includes("guide") ? "selected" : ""}`}
          onClick={() => toggleOption("guide")}
        >
          Call me to confirm booking!
        </button>
        <button
          type="button"
          className={`round-option ${selected.includes("change") ? "selected" : ""}`}
          onClick={() => toggleOption("change")}
        >
          Send me an email to confirm booking!
        </button>
      </div>

      {/* Кнопка переходу */}
      <div className="booking-button-wrapper">
        <button type="button" onClick={handleContinue} className="btn-continue">
          Continue
        </button>
      </div>
    </>
  );
};

export default BookingStepContact;
