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
              <div
                className={`rating-circle mobile-only ${
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

              {/* Facilities */}
              <div className="hotel-facilities">
                {hotel.description && (
                  <>
                    {hotel.description.wiFi && (
                      <span className="facility-chip">Wi-Fi</span>
                    )}
                    {hotel.description.freeWiFi && (
                      <span className="facility-chip">Free Wi-Fi</span>
                    )}
                    {hotel.description.parkingPlaces > 0 && (
                      <span className="facility-chip">
                        Parking ({hotel.description.parkingPlaces})
                      </span>
                    )}
                    {hotel.description.kitchen && (
                      <span className="facility-chip">Kitchen</span>
                    )}
                    {hotel.description.sleepingArrangements > 0 && (
                      <span className="facility-chip">
                        Sleeping for {hotel.description.sleepingArrangements}
                      </span>
                    )}
                    {hotel.description.appartamentSize > 0 && (
                      <span className="facility-chip">
                        {hotel.description.appartamentSize} m²
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Адреса */}
              {hotel.address && (
                <p className="hotel-address">{hotel.address}</p>
              )}

              {/* Кнопка See on the map */}
              <button
                className="see-on-map-btn"
                onClick={() => {
                  if (
                    hotel.latitudeCoordinate == null ||
                    hotel.longitudeCoordinate == null
                  ) {
                    alert("Координати готелю відсутні");
                    return;
                  }
                  const coords = `${hotel.latitudeCoordinate},${hotel.longitudeCoordinate}`;
                  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    coords
                  )}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                See on the map <span className="arrow">→</span>
              </button>

              {/* Description */}
              {hotel.description?.text && (
                <p className="hotel-description">{hotel.description.text}</p>
              )}
            </div>

            {/* Права колонка - рейтинг зверху, ціна та кнопка внизу */}
            <div className="hotel-col-right">
              <div
                className={`rating-circle desktop-only ${
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

        {/* Пагінація */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 100, behavior: "smooth" });
                }}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
