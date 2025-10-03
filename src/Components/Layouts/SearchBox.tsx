// ============================================
// Файл: src/components/layouts/SearchBox.tsx
// Компонент: SearchBox
// Використовується: панель пошуку на Home, Search
// Опис: Вибір напрямку, дати, гостей та кімнат з кнопкою пошуку
// ============================================

import React, { useState, useRef, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBox.css";
import { useNavigate } from "react-router-dom";

// Форматування дати для відображення
function formatDate(date: Date | null) {
  if (!date) return "";
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Кастомний інпут для DatePicker
const DateRangeInput = forwardRef<HTMLInputElement, any>(
  ({ value, onClick, startDate, endDate }, ref) => {
    const label =
      startDate && endDate
        ? `${formatDate(startDate)} — ${formatDate(endDate)}`
        : "Check in — Check out";

    return (
      <button
        type="button"
        className="date-display text"
        onClick={onClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
        aria-label="Select date range"
      >
        {label}
      </button>
    );
  }
);
DateRangeInput.displayName = "DateRangeInput";

export default function SearchBox() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [openGuestMenu, setOpenGuestMenu] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Функція зміни кількості гостей або кімнат
  const changeValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number,
    min = 0
  ) => setter((prev) => Math.max(prev + delta, min));

  const guestOptions = [
    { label: "Adults", value: adults, setter: setAdults, min: 1 },
    { label: "Children", value: children, setter: setChildren, min: 0 },
    { label: "Rooms", value: rooms, setter: setRooms, min: 1 },
  ];

  // Закриття спливаючого меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpenGuestMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-box">
      <div className="search-box-bg"></div>

      <form className="search-section" onSubmit={(e) => e.preventDefault()}>
        {/* Destination */}
        <div className="search-item destination">
          <img
            src="/icons/searchBox__imgs/airplane.svg"
            alt="airplane"
            className="icon"
          />
          <input
            className="text"
            type="text"
            placeholder="Where are you going?"
            aria-label="Destination"
          />
        </div>

        {/* Dates */}
        <div className="search-item dates">
          <img
            src="/icons/searchBox__imgs/calendar.svg"
            alt="calendar"
            className="icon"
          />
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={setDateRange}
            isClearable
            customInput={
              <DateRangeInput startDate={startDate} endDate={endDate} />
            }
            minDate={new Date()}
            monthsShown={2}
          />
        </div>

        {/* Guests */}
        <div className="search-item guests" ref={popupRef}>
          <img
            src="/icons/searchBox__imgs/human.svg"
            alt="guests"
            className="icon"
          />
          <div
            className="guest-summary text"
            onClick={() => setOpenGuestMenu(!openGuestMenu)}
            tabIndex={0}
            role="button"
            aria-expanded={openGuestMenu}
          >
            {guestOptions.map(({ label, value }) => (
              <div key={label} className="guest-count">
                <span>
                  {value} {label.toLowerCase()}
                </span>
                <span className={label === "Rooms" ? "arrow" : "dot"} />
              </div>
            ))}
          </div>

          {openGuestMenu && (
            <div
              className="guest-popup"
              role="dialog"
              aria-label="Guests and rooms"
            >
              {guestOptions.map(({ label, value, setter, min }) => (
                <div key={label} className="guest-row">
                  <span>{label}</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => changeValue(setter, -1, min)}
                      aria-label={`Decrease ${label.toLowerCase()}`}
                    >
                      −
                    </button>
                    <span className="count">{value}</span>
                    <button
                      type="button"
                      onClick={() => changeValue(setter, 1)}
                      aria-label={`Increase ${label.toLowerCase()}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="search-item submit">
          <button
            className="search-icon"
            type="submit"
            aria-label="Search"
            onClick={() => navigate("/search")}
          />
        </div>
      </form>
    </div>
  );
}
