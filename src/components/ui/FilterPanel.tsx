// ============================================
// Файл: src/components/ui/FilterPanel.tsx
// Компонент: FilterPanel
// Використовується: на Search
// Призначення: панель фільтрів для пошуку готелів
// ============================================
import React, { useState } from "react";
import "./FilterPanel.css";

const RATINGS = ["6+", "7+", "8+", "9+"];
const TYPES = ["Hotel", "Apartment", "Hostel"];
const CATEGORIES = ["Luxury", "Budget", "Business", "Family"];
const FACILITIES = ["Kitchen", "WiFi", "Free WiFi", "Parking"];

export default function FilterPanel() {
  const [maxPrice, setMaxPrice] = useState(230);
  const [rating, setRating] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  const toggleMultipleChoice = (
    current: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const toggleSingleCheckbox = (value: string) => {
    setRating(rating === value ? "" : value);
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Price</h3>
        <div className="price-values">
          <span>76$ night</span>
          <span>{maxPrice}$ night</span>
        </div>
        <div className="price-slider-container">
          <input
            type="range"
            min={76}
            max={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        {RATINGS.map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={rating === value}
              onChange={() => toggleSingleCheckbox(value)}
            />
            <span className="custom-radio"></span>
            <span className="rating-label">{value}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Type</h3>
        {TYPES.map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={types.includes(value)}
              onChange={() => toggleMultipleChoice(types, value, setTypes)}
            />
            <span className="custom-radio"></span>
            <span className="rating-label">{value}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Category</h3>
        {CATEGORIES.map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={categories.includes(value)}
              onChange={() =>
                toggleMultipleChoice(categories, value, setCategories)
              }
            />
            <span className="custom-radio"></span>
            <span className="rating-label">{value}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Facilities</h3>
        {FACILITIES.map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              checked={facilities.includes(value)}
              onChange={() =>
                toggleMultipleChoice(facilities, value, setFacilities)
              }
            />
            <span className="custom-radio"></span>
            <span className="rating-label">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
