import React, { useState } from "react";
import "../ui/BookingStep.css";

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

  const validateField = (name: string, value: string) => {
    let isValid = true;
    let message = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          isValid = false;
          message = "Поле не заповнене";
        } else if (/\d/.test(value)) {
          isValid = false;
          message = "Ім'я не може містити цифри";
        }
        break;
      case "email":
        if (!value.trim()) {
          isValid = false;
          message = "Поле не заповнене";
        } else if (!value.includes("@")) {
          isValid = false;
          message = "Email повинен містити @";
        }
        break;
      case "confirmEmail":
        if (value !== formData.email) {
          isValid = false;
          message = "Email не співпадає";
        }
        break;
    }

    return { isValid, message };
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(e);

    // Прибираємо помилку при введенні
    if (errors[name as keyof typeof errors]) {
      const validation = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, [name]: validation.message }));
    }
  };

  const handleContinue = () => {
    const newErrors: any = {};
    const newMessages: any = {};

    ["firstName", "lastName", "email", "confirmEmail"].forEach((field) => {
      const validation = validateField(field, formData[field] || "");
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
            <div className="name-row">
              <div className={`form-group ${errors.firstName ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFieldChange}
                  placeholder="Name"
                />
                {errors.firstName && (
                  <span className="error-bubble">{errorMessages.firstName}</span>
                )}
              </div>

              <div className={`form-group ${errors.lastName ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFieldChange}
                  placeholder="Surname"
                />
                {errors.lastName && (
                  <span className="error-bubble">{errorMessages.lastName}</span>
                )}
              </div>
            </div>

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
              {errors.email && (
                <span className="error-bubble">{errorMessages.email}</span>
              )}
            </div>

            <div className={`form-group ${errors.confirmEmail ? "has-error" : ""}`}>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleFieldChange}
                placeholder="Confirm Email"
              />
              {errors.confirmEmail && (
                <span className="error-bubble">{errorMessages.confirmEmail}</span>
              )}
            </div>

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

      <div className="booking-button-wrapper">
        <button type="button" onClick={handleContinue} className="btn-continue">
          Continue
        </button>
      </div>
    </>
  );
};

export default BookingStepPersonal;