// ============================================
// Компонент: HotelList
// Використовується: на Search
// Опис: виведення елементів масиву обєктів
// ============================================
import { useState } from "react";
import { HotelView } from "../../models/HotelView";
import { useNavigate } from "react-router-dom";
import "./HotelList.css";

interface HotelListProps {
  hotels: HotelView[];
}

export default function HotelList({ hotels }: HotelListProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleChooseClick = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentHotels = hotels.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  return (
    <>
      <div className="search-hotel-list">
        {currentHotels.map((hotel) => (
          <div className="search-hotel-card" key={hotel.id}>
            {/* Ліва колонка - зображення */}
            <div className="hotel-col-left">
              <img
                src={hotel.photos?.[0] || "/images/default-hotel.jpg"}
                alt={hotel.name}
              />
            </div>

            {/* Середня колонка - інформація про готель */}
            <div className="hotel-col-center">
              <h3 className="hotel-name">{hotel.name}</h3>

              {/* Зірочки рейтингу */}
              <div className="hotel-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star ${
                      i < Math.round(hotel.rating / 2) ? "filled" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Facilities (заглушка) */}
              <div className="hotel-facilities">
                {["Facility 1", "Facility 2", "Facility 3"].map((f) => (
                  <span key={f} className="facility-chip">
                    {f}
                  </span>
                ))}
              </div>

              {/* Адреса */}
              {hotel.address && (
                <p className="hotel-address">{hotel.address}</p>
              )}

              {/* Кнопка See on the map */}
              <button
                className="see-on-map-btn"
                onClick={() => navigate("/map")}
              >
                See on the map <span className="arrow">→</span>
              </button>

              {/* Опис (тимчасова заглушка) */}
              <p className="hotel-description">
                Тимчасова заглушка - опис в description, як і facilities Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
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
                  <p className="price-value">${hotel.priceForDay}</p>
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

      {/* Пагінація */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
