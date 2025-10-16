import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HotelView } from '../../models/HotelView';
import './HotelRooms.css';

interface Props {
  hotel: HotelView;
}

const HotelRooms: React.FC<Props> = ({ hotel }) => {
  const navigate = useNavigate();
  const rooms = ['Standard Room', 'Deluxe Room'];

  const handleChoose = (room: string, idx: number) => {
    const price = hotel.priceForDay + idx * 30;
    navigate('/booking', {
      state: {
        roomName: room,
        hotelName: hotel.name,
        price: price,
      },
    });
  };

  return (
    <section className="content-section" id="hotel-rooms-section">
      <h2 className="tittleAR">Available Rooms</h2>
      <div className="rooms-list">
        {rooms.map((room, idx) => (
          <div key={idx} className="room-card">
            <div className="room-image">
              <img
                src={hotel.photos[idx % hotel.photos.length] || '/images/default-hotel.jpg'}
                alt={room}
              />
            </div>
            <div className="room-details-left">
              <h4 className="room-name">{room}</h4>
              <span className="room-info">1 double bed</span>
              <span className="room-info">2 guests</span>
              <p className="room-status">Free Cancel</p>
            </div>
            <div className="room-details-right">
              <div className="room-price">${hotel.priceForDay + idx * 30}</div>
              <button
                className="btn-choose"
                onClick={() => handleChoose(room, idx)}
              >
                Choose
              </button>
              <button className="btn-more-info">More Info</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelRooms;