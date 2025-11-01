import React, { useState } from "react";
import "../ui/BookingStep.css";
import FormErrorBubble, { validateRequired, validateNoDigits, validateNoSymbols, validateHasAt, validateMatch } from "../ui/FormErrorBubble";


interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNext: () => void;
}

const BookingStepPersonal: React.FC<Props> = ({ formData, handleChange, handleNext }) => {
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    confirmEmail: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
  });

  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Універсальна перевірка полів
  const validatePersonalField = (name: string, value: string): { isValid: boolean; message: string } => {
    const validators = [];

    if (name === "firstName" || name === "lastName") {
      validators.push(validateRequired(value), validateNoDigits(value), validateNoSymbols(value));
    }

    if (name === "email") {
      validators.push(validateRequired(value), validateHasAt(value));
    }

    if (name === "confirmEmail") {
      validators.push(validateMatch(value, formData.email));
    }

    for (const check of validators) {
      if (!check.isValid) return check;
    }

    return { isValid: true, message: "" };
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(e);

    if (errors[name as keyof typeof errors]) {
      const validation = validatePersonalField(name, value);
      setErrors((prev) => ({ ...prev, [name]: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, [name]: validation.message }));
    }
  };

  const handleContinue = () => {
    const newErrors: any = {};
    const newMessages: any = {};

    ["firstName", "lastName", "email", "confirmEmail"].forEach((field) => {
      const validation = validatePersonalField(field, formData[field] || "");
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
          <div className="step-left">1/3</div>
          <div className="step-center">Booking</div>
        </div>

        <div className="form-two-columns">
          <div className="form-left">
            {/* Імя */}
            <div className="name-row">
              <div className={`form-group ${errors.firstName ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFieldChange}
                  placeholder="Name"
                />
                <FormErrorBubble message={errorMessages.firstName} show={errors.firstName} />
              </div>

              <div className={`form-group ${errors.lastName ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFieldChange}
                  placeholder="Surname"
                />
                <FormErrorBubble message={errorMessages.lastName} show={errors.lastName} />
              </div>
            </div>

            {/* Email */}
            <div className={`form-group ${errors.email ? "has-error" : ""} form-inline`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder="Email"
              />
              <p className="form-hint-inline">
                To this address we will send a confirmation and a guide to the city!
              </p>
              <FormErrorBubble message={errorMessages.email} show={errors.email} />
            </div>

            {/* Повторення Email */}
            <div className={`form-group ${errors.confirmEmail ? "has-error" : ""}`}>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleFieldChange}
                placeholder="Confirm Email"
              />
              <FormErrorBubble message={errorMessages.confirmEmail} show={errors.confirmEmail} />
            </div>

            {/* Password (опціональне поле без перевірок) */}
            <div className="form-group form-inline">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password for your booking"
              />
              <p className="form-hint-inline">It's optional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Опції */}
      <div className="option-buttons">
        <button
          type="button"
          className={`round-option ${selected.includes("guide") ? "selected" : ""}`}
          onClick={() => toggleOption("guide")}
        >
          I want to get a city guide!
        </button>
        <button
          type="button"
          className={`round-option ${selected.includes("change") ? "selected" : ""}`}
          onClick={() => toggleOption("change")}
        >
          The ability to change the booking (until 00.00.2025)
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

export default BookingStepPersonal;
