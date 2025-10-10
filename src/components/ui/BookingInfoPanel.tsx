// ============================================
// Файл: src/components/ui/BookingRoomInfoPanel.tsx
// Компонент: BookingRoomInfoPanel
// Використовується: на сторінці BookingPage
// Опис: Відображає інформацію про вибраний номер (зображення, деталі, статус)
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
  // Знаходимо готель у тестових даних
  const hotel = hotelsData.find(
    (h: any) => h.name.toLowerCase() === hotelName.toLowerCase()
  );

  // Визначаємо зображення номера
  const selectedImage =
    roomImage ||
    hotel?.images?.[roomIndex % (hotel?.images?.length || 1)] ||
    "../icons/test/Rectangle 10.svg";

  return (
    <div className="booking-room-info-panel">
      <div className="booking-room-container">
        {/* Фото номера */}
        <div className="booking-room-image">
          <img src={selectedImage} alt={roomName} />
        </div>

        {/* Деталі номера */}
        <div className="booking-room-details">
          <h4 className="booking-room-name">{roomName}</h4>
          <span className="booking-room-meta">1 double bed</span>
          <span className="booking-room-meta">2 guests</span>
          <p className="booking-room-status">Free Cancel</p>
        </div>
      </div>
    </div>
  );
};

export default BookingRoomInfoPanel;
