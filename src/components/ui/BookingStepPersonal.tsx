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

  const [selected, setSelected] = useState<string | null>(null);
  
    const toggleOption = (value: string) => {
      setSelected((prev) => (prev === value ? null : value));
    };
  
  const handleContinue = () => {
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      confirmEmail: formData.email !== formData.confirmEmail,
    };
    setErrors(newErrors);
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
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>

              <div className={`form-group ${errors.lastName ? "has-error" : ""}`}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Surname"
                />
              </div>
            </div>

            <div className={`form-group ${errors.email ? "has-error" : ""} form-inline`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <p className="form-hint-inline">
                To this address we will send a confirmation and a guide to the city!
              </p>
            </div>

            <div className={`form-group ${errors.confirmEmail ? "has-error" : ""}`}>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                placeholder="Confirm Email"
              />
            </div>

            <div className="form-group form-inline">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password for your booking"
              />
              <p className="form-hint-inline">It’s optional</p>
            </div>
          </div>
        </div>
      </div>

      <div className="option-buttons">
        <button
          type="button"
          className={`round-option ${selected === "guide" ? "selected" : ""}`}
          onClick={() => toggleOption("guide")}
        >
          I want to get a city guide!
        </button>
        <button
          type="button"
          className={`round-option ${selected === "change" ? "selected" : ""}`}
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
