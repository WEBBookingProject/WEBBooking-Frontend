// ============================================
// Файл: src/components/ui/ReviewsPanel.tsx
// Компонент: ReviewsPanel
// Використовується: на HomePage
// Призначення: Компонент панелі коментарів
// ============================================

import { CommentView } from "../../models/CommentView";
import "./ReviewsPanel.css";

interface ReviewsPanelProps {
  comments: CommentView[];
}

export default function ReviewsPanel({ comments }: ReviewsPanelProps) {
  return (
    <div className="reviews-panel">
      <h2 className="reviews-title">REVIEWS</h2>
      <div className="reviews-cards">
        {/* Контейнер карток коментарів */}
        {comments.map((comment: CommentView) => (
          <div key={comment.id} className="review-card">
            {/* Картка окремого коментаря */}
            <div className="review-header">
              <div className="review-user">
                <img
                  src={comment.avatarUrl}
                  alt={comment.name}
                  className="review-avatar"
                />
                <div className="review-name-hotel">
                  <span className="review-name">{comment.name}</span>
                  <span className="review-hotel">{comment.hotelName}</span>
                </div>
              </div>
              <span className="review-time">{comment.daysAgo} days ago</span>
            </div>
            <p className="review-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
