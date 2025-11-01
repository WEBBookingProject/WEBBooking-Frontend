// ============================================
// Файл: src/components/ui/BookingInfoPanel.tsx
// Компонент: BookingInfoPanel (компактна картка номера)
// ============================================

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../../services/hotelService";
import { HotelView } from "../../models/HotelView";
import "./BookingInfoPanel.css";

interface Props {
  roomName: string;
  hotelName: string;
  roomImage?: string;
  roomIndex?: number;
}

const BookingInfoPanel: React.FC<Props> = ({
  roomName,
  hotelName,
  roomImage,
  roomIndex = 0,
}) => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<HotelView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotel = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const hotelData = await getHotelById(id);
        setHotel(hotelData);
      } catch (error) {
        console.error("Error loading hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, [id]);

  if (loading) {
    return (
      <section className="content-section booking-room-container-book">
        <div className="room-card small">Loading...</div>
      </section>
    );
  }

  const selectedImage =
    roomImage ||
    hotel?.photos?.[roomIndex % (hotel?.photos?.length || 1)] ||
    "/images/default-hotel.jpg";

  const price = hotel?.priceForDay
    ? hotel.priceForDay + roomIndex * 30
    : 0;

  const sleepingArrangements = hotel?.description?.sleepingArrangements || "1 double bed";
  const maxGuests = hotel?.maxGuests || 2;

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
              className="facility-icon" 
            />
            <span>Bed: {sleepingArrangements}</span>
          </div>

          <div className="room-info-block">
            <img
              src="/icons/ui/profile2user.svg"
              alt="Guests"
              className="facility-icon" 
            />
            <span>Guests: maximum {maxGuests}</span>
          </div>

          {hotel?.description && (
            <div className="hotel-facilities">
              {hotel.description.wiFi && (
                <div className="facility-chip small">
                  <img
                    src="/icons/ui/internet.svg"
                    alt="Wi-Fi"
                    className="facility-icon"
                  />
                  <strong>wi-fi</strong>
                </div>
              )}
              {hotel.description.parkingPlaces && (
                <div className="facility-chip small">
                  <img
                    src="/icons/ui/parking.svg"
                    alt="Parking"
                    className="facility-icon"
                  />
                  <strong>parking</strong>
                </div>
              )}
              {hotel.description.kitchen && (
                <div className="facility-chip small">
                  <img
                    src="/icons/ui/kitchen.svg"
                    alt="Kitchen"
                    className="facility-icon"
                  />
                  <strong>kitchen</strong>
                </div>
              )}
            </div>
          )}

          <p className="room-status">✓ Free cancellation</p>
        </div>
      </div>
    </section>
  );
};

export default BookingInfoPanel;