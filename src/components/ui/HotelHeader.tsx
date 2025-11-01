// ============================================
// Компонент: HotelHeader
// Опис: Верхній блок сторінки готелю з рейтингом і кнопкою перегляду відгуків
// ============================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelHeader.css';

interface HotelHeaderProps {
  name: string;
  rating: number;
  onBack?: () => void;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({ name, rating, onBack }) => {
  const navigate = useNavigate();
  
    const handleBack = () => {
    navigate('/search');
  };

  // Рендер зірок за рейтингом
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="stars-container">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star star-full">★</span>
        ))}
      </div>
    );
  };

  // Плавний скрол до секції відгуків
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    reviewsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hotel-header">
      {/* Кнопка "Назад" */}
      {/* {onBack && (
        <button className="back-btn" onClick={onBack}>
          <img src="/icons/ui/back.svg" alt="Back" className="back-icon" />
        </button>
      )} */}

      <button className="back-btn" onClick={handleBack}>
        <img src="/icons/ui/back.svg" alt="Back" className="back-icon" />
      </button>

      {/* Назва, рейтинг і кнопка Check */}
      <div className="hotel-header-main">
        <div className="hotel-title-center">
          {renderStars(rating)}
          <h1 className="hotel-name-header">{name}</h1>
        </div>

        <div className="right-controls">
          {/* Коло з рейтингом */}
          <div className={`rating-circle ${rating > 9 ? 'top-rating' : ''}`}>
            {rating.toFixed(1)}
            {rating > 9 && (
              <img src="/icons/ui/crown.svg" alt="Top rating" className="crown-icon" />
            )}
          </div>

          {/* Кнопка "Check" */}
          <button className="check-btn" onClick={scrollToReviews}>
            <span className="check-text">Check</span>
            <img src="/icons/ui/arrowdown.svg" alt="Down" className="check-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HotelHeader;