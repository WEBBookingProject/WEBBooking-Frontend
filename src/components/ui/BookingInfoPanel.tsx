// ============================================
// Файл: src/components/ui/BookingRoomInfoPanel.tsx
// Компонент: BookingRoomInfoPanel (компактна картка номера)
// ============================================

import React from "react";
import "../ui/BookingInfoPanel.css";
import hotelsData from "../../data/TestFiles/testObjects.json";

interface Props {
  roomName: string;
  hotelName: string;
  roomImage?: string;
  roomIndex?: number;
}

const BookingRoomInfoPanel: React.FC<Props> = ({
  roomName,
  hotelName,
  roomImage,
  roomIndex = 0,
}) => {
  const hotel = hotelsData.find(
    (h: any) => h.name.toLowerCase() === hotelName.toLowerCase()
  );

  const selectedImage =
    roomImage ||
    hotel?.images?.[roomIndex % (hotel?.images?.length || 1)] ||
    "../icons/test/Rectangle 10.svg";

  const price = hotel?.price_per_night
    ? hotel.price_per_night + roomIndex * 30
    : 0;

  return (
    <section className="content-section booking-room-container-book">
      <div className="room-card small">
        <div className="room-image small">
          <img src={selectedImage} alt={roomName} />
        </div>

        <div className="room-details-left small">
          <h4 className="room-name">{roomName}</h4>

          <div className="room-info-block">
            <img
              src="/icons/ui/bedroom.svg"
              alt="Bed"
              style={{ width: "18px", height: "18px" }}
            />
            <span>1 double bed</span>
          </div>

          <div className="room-info-block">
            <img
              src="/icons/ui/profile2user.svg"
              alt="Guests"
              style={{ width: "18px", height: "18px" }}
            />
            <span>2 guests</span>
          </div>

          {hotel?.facilities && (
            <div className="hotel-facilities">
              {hotel.facilities.map((f: string, i: number) => (
                <div className="facility-chip small" key={i}>
                  <img
                    src={`/icons/ui/${f.toLowerCase()}.svg`}
                    alt={f}
                    className="facility-icon"
                  />
                  <strong>{f}</strong>
                </div>
              ))}
            </div>
          )}

          <p className="room-status">✓ Free cancellation</p>
        </div>
      </div>
    </section>
  );
};

export default BookingRoomInfoPanel;
