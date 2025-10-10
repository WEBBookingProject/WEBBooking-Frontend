// ============================================
// Компонент: HotelReviews
// Опис: Відображає відгуки користувачів з кнопкою "More/Less"
// ============================================

import React, { useState } from 'react';
import { HotelView } from '../../models/HotelView';
import { CommentView } from '../../models/CommentView';
import ReviewsPanel from './ReviewsPanel';
import './HotelReviews.css';

interface Props {
  hotel: HotelView;
  comments: CommentView[];
}

const HotelReviews: React.FC<Props> = ({ hotel, comments }) => {
  const [showAll, setShowAll] = useState(false);

  // Відображаємо лише 3 коментарі або всі
  const visibleComments = showAll ? comments : comments.slice(0, 3);

  return (
    <div className="hotel-reviews" id="reviews-section">
      {/* Панель відгуків */}
      <ReviewsPanel comments={visibleComments} />

      {/* Кнопка More/Less */}
      {comments.length > 3 && (
        <>
          <hr className="reviews-divider" />
          <div className="more-btn-wrapper">
            <button 
              className="more-btn" 
              onClick={() => setShowAll(!showAll)}
            >
              <span className="more-text">{showAll ? 'Less' : 'More'}</span>
              <img 
                src="/icons/ui/arrowdown.svg" 
                alt="Arrow" 
                className={`more-icon ${showAll ? 'rotate' : ''}`} 
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HotelReviews;