import React, { useState } from "react";
import "../ui/BookingStep.css";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNext: () => void;
}

const BookingStepContact: React.FC<Props> = ({
  formData,
  handleChange,
  handleNext,
}) => {
  const [errors, setErrors] = useState({
    country: false,
    phone: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    country: "",
    phone: "",
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
      case "country":
        if (!value.trim()) {
          isValid = false;
          message = "The field is not filled in";
        }
        break;
      case "phone":
        if (!value.trim()) {
          isValid = false;
          message = "The field is not filled in";
        } else if (!/^[+]?[\d\s()-]+$/.test(value)) {
          isValid = false;
          message = "The phone number can only contain numbers and the "+" sign";
        }
        break;
    }

    return { isValid, message };
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(e);

    if (errors[name as keyof typeof errors]) {
      const validation = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: !validation.isValid }));
      setErrorMessages((prev) => ({ ...prev, [name]: validation.message }));
    }
  };

  const handleContinue = () => {
    const newErrors: any = {};
    const newMessages: any = {};

    ["country", "phone"].forEach((field) => {
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
          <div className="step-left">2/3</div>
          <div className="step-center">Booking</div>
        </div>

        <div className="form-two-columns">
          <div className="form-left">
            <div className={`form-group ${errors.country ? "has-error" : ""}`}>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleFieldChange}
                placeholder="Country"
              />
              {errors.country && (
                <span className="error-bubble">{errorMessages.country}</span>
              )}
            </div>

            <div className={`form-group ${errors.phone ? "has-error" : ""} form-inline`}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                placeholder="Phone number"
              />
              <p className="form-hint-inline">
                In order for administration to be able to contact you
              </p>
              {errors.phone && (
                <span className="error-bubble">{errorMessages.phone}</span>
              )}
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

      <div className="booking-button-wrapper">
        <button type="button" onClick={handleContinue} className="btn-continue">
          Continue
        </button>
      </div>
    </>
  );
};

export default BookingStepContact;