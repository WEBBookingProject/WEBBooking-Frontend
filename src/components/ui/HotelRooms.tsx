import React from "react";
import { useNavigate } from "react-router-dom";
import { HotelView } from "../../models/HotelView";
import "./HotelRooms.css";
import "./HotelList.css";
import "./HotelFacilities.css";

interface Props {
  hotel: HotelView;
}

const HotelRooms: React.FC<Props> = ({ hotel}) => {
  const navigate = useNavigate();

  const roomNames = ["Standard Room", "Deluxe Room", "Suite"];

  const handleChoose = (room: string, idx: number) => {
    const price = hotel.priceForDay + idx * 30;
    navigate(`/hotel/${hotel.id}/booking`, {
      state: {
        roomName: room,
        hotelName: hotel.name,
        price: price,
        propertyId: hotel.id,
        hotelImages: hotel.photos,
        roomIndex: idx,
        rating: hotel.rating
      },
    });
  };

  return (
    <section className="content-section" id="hotel-rooms-section">
      <h2 className="tittle">Available Rooms</h2>

      <div className="rooms-list">
        {roomNames.map((room, idx) => (
          <div className="room-card" key={idx}>
            <div className="room-image">
              <img
                src={hotel.photos[idx % hotel.photos.length] || "/images/default-hotel.jpg"}
                alt={room}
              />
            </div>

            <div className="room-details-left">
              <h4 className="room-name">{room}</h4>

              <div className="room-info-block">
                <img src="/icons/ui/bedroom.svg" alt="Bed" className="facility-icon"  />
                <span>Bed: {hotel.description?.sleepingArrangements || "—"}</span>
              </div>

              <div className="room-info-block">
                <img src="/icons/ui/profile2user.svg" alt="Guest" className="facility-icon" />
                <span>Guests: maximum {hotel.maxGuests} </span>
              </div>

              <div className="hotel-facilities">
                {hotel.description?.wiFi && (
                  <div className="facility-chip">
                    <img src="/icons/ui/internet.svg" alt="Wi-Fi" className="facility-icon" />
                    <strong>wi-fi</strong>
                  </div>
                )}
                {hotel.description?.parkingPlaces && (
                  <div className="facility-chip">
                    <img src="/icons/ui/parking.svg" alt="Parking" className="facility-icon" />
                    <strong>parking</strong>
                  </div>
                )}
                {hotel.description?.kitchen && (
                  <div className="facility-chip">
                    <img src="/icons/ui/kitchen.svg" alt="Kitchen" className="facility-icon" />
                    <strong>kitchen</strong>
                  </div>
                )}
              </div>

              <p className="room-status">✓ FREE cancellation</p>
            </div>

            <div className="room-details-right">
              <div className="room-price">${hotel.priceForDay + idx * 30}</div>
              <button className="btn-choose" onClick={() => handleChoose(room, idx)}>Choose</button>
              <button className="btn-more-info">More Info</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelRooms;