// ============================================
// Компонент: FilterPanel
// Використовується: на Search
// Опис: панель з фільтрами для пошуку
// ============================================

import React, { useState } from "react";
import "./FilterPanel.css";
import { HotelView } from "../../models/HotelView";
import { searchHotels } from "../../services/hotelService";

const RATINGS = ["1+", "2+", "3+", "4+", "5+", "6+", "7+", "8+", "9+"];
const TYPES = ["Hotel", "Apartment", "Hostel", "Studio"];
const CATEGORIES = ["Luxury", "Budget", "Business", "Family"];
const FACILITIES = ["Kitchen", "WiFi", "Free WiFi", "Parking"];

interface FilterPanelProps {
  onApplyFilters: (hotels: HotelView[]) => void;
}

export default function FilterPanel({ onApplyFilters }: FilterPanelProps) {
  const [maxPrice, setMaxPrice] = useState(100);
  const [rating, setRating] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  const toggleMultipleChoice = (
    current: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const toggleSingleCheckbox = (value: string) => {
    setRating(rating === value ? "" : value);
  };

  const applyFilters = async () => {
    try {
      const ratingNumber = rating ? parseInt(rating) : 0;
      const filters = {
        maxPrice,
        rating: ratingNumber,
        type: types[0] || undefined,
        category: categories[0] || undefined,
        kitchen: facilities.includes("Kitchen"),
        wifi: facilities.includes("WiFi"),
        freeWifi: facilities.includes("Free WiFi"),
        parkingPlaces: facilities.includes("Parking") ? 1 : 0,
      };

      console.log("Sending filters:", filters);

      const hotels = await searchHotels(filters);
      console.log("Received hotels:", hotels);

      onApplyFilters(hotels);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  return (
    <div className="filter-panel">
      {/* Price */}
      <div className="filter-section">
        <h3>Price (max)</h3>
        <div className="price-values">
          <span>${maxPrice}</span>
        </div>
        <div className="price-slider-container">
          <input
            type="range"
            min={0}
            max={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Rating */}
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

      {/* Type */}
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
      {/* Category */}
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

      {/* Facilities */}
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

      {/* Apply button */}
      <div className="filter-section apply-button-container">
        <button className="apply-btn" onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
}