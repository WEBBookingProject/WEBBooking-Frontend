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
  const [selected, setSelected] = useState<string | null>(null);

  const toggleOption = (value: string) => {
    setSelected((prev) => (prev === value ? null : value));
  };

  const handleContinue = () => {
    const newErrors = { country: !formData.country, phone: !formData.phone };
    setErrors(newErrors);
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
                onChange={handleChange}
                placeholder="Country"
              />
            </div>

            <div className={`form-group ${errors.phone ? "has-error" : ""} form-inline`}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
              <p className="form-hint-inline">
                In order for administration to be able to contact you
              </p>
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
          Call me to confirm  booking!
        </button>
        <button
          type="button"
          className={`round-option ${selected === "change" ? "selected" : ""}`}
          onClick={() => toggleOption("change")}
        >
          Send me an email to confirm  booking!
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
