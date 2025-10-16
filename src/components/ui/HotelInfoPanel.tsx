import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HotelView } from '../../models/HotelView';
import { CommentView } from '../../models/CommentView';
import exampleComment from '../../data/TestFiles/testComments.json';
import './HotelInfoPanel.css';

interface HotelInfoProps {
  hotel: HotelView;
}

const HotelInfo: React.FC<HotelInfoProps> = ({ hotel }) => {
  const navigate = useNavigate();
  const comments: CommentView[] = exampleComment;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextComment = () => {
    setCurrentIndex(prevIndex => prevIndex === comments.length - 1 ? 0 : prevIndex + 1);
  };

  const scrollToRooms = () => {
    const roomsSection = document.getElementById('hotel-rooms-section');
    roomsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentComment = comments[currentIndex];

  return (
    <div className="hotel-info">
      {/* Основна панель */}
      <div className="hotel-main-block">
        <div className="left-block">
          <div className="price-block">
            <span className="price">${hotel.priceForDay}</span>
            <span className="price-label">per night</span>
          </div>
          <div className="location-block">
            <span className="location-text">{hotel.country} | {hotel.city}</span>
          </div>
        </div>

        {/* Кнопка Book з прокруткою */}
        <button className="btn-book" onClick={scrollToRooms}>
          Book
        </button>
      </div>

      {/* Опис готелю */}
      <div className="hotel-description">
        <p>{hotel.description}</p>
      </div>

      <hr className="review-divider" />

      {/* Коментар користувача */}
      <div className="hotel-review wide">
        <div className="review-header">
          <div className="review-user">
            <div className="review-name-hotel">
              <span className="review-name">{currentComment.name}</span>
              <span className="review-hotel">{currentComment.hotelName}</span>
            </div>
          </div>
          <span className="review-time">{currentComment.daysAgo} days ago</span>
        </div>
        <p className="review-text">{currentComment.text}</p>

        <button className="next-comment-btn" onClick={nextComment}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HotelInfo;
