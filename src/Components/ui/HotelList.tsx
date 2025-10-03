// ============================================
// Файл: src/components/ui/HotelList.tsx
// Компонент: HotelList
// Використовується: на Search
// Призначення: виведення списку готелів, перехід тільки по кнопці "Choose"
// ============================================

import { HotelView } from "../../models/HotelView";
import { useNavigate } from "react-router-dom";
import "./HotelList.css";

interface HotelListProps {
  hotels: HotelView[];
}

export default function HotelList({ hotels }: HotelListProps) {
  const navigate = useNavigate();

  const handleChooseClick = (hotelId: string) => {
    navigate("/hotel");
  };

  return (
    <div className="search-hotel-list">
      {hotels.map((hotel) => (
        <div className="search-hotel-card" key={hotel.id}>
          {/* Ліва колонка - зображення */}
          <div className="hotel-col-left">
            <img src={hotel.images[0]} alt={hotel.name} />
          </div>

          {/* Середня колонка - інформація про готель */}
          <div className="hotel-col-center">
            <h3 className="hotel-name">{hotel.name}</h3>
            <div className="hotel-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`star ${
                    i < Math.round(hotel.rating) ? "filled" : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="hotel-facilities">
              {hotel.facilities.map((f) => (
                <span key={f} className="facility-chip">
                  {f}
                </span>
              ))}
            </div>
            <p className="hotel-category">{hotel.category}</p>
            <button className="see-on-map-btn" onClick={() => navigate("/map")}>
              See on the map <span className="arrow">→</span>
            </button>
            <p className="hotel-description">{hotel.description}</p>
          </div>

          {/* Права колонка - рейтинг зверху, ціна та кнопка внизу */}
          <div className="hotel-col-right">
            <div
              className={`rating-circle ${
                hotel.rating > 9 ? "top-rating" : ""
              }`}
            >
              {hotel.rating.toFixed(1)}
              {hotel.rating > 9 && (
                <img
                  src="/icons/ui/crown.svg"
                  alt="Top rating"
                  className="crown-icon"
                />
              )}
            </div>

            <div className="price-choose-block">
              <div className="price-block">
                <p className="price-label">Price from</p>
                <p className="price-value">${hotel.price_per_night}</p>
              </div>
              <button
                className="choose-btn"
                onClick={() => handleChooseClick(hotel.id)}
              >
                Choose
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
