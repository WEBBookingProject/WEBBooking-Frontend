// ============================================
// Файл: src/components/pages/Home.tsx
// Компонент: Home
// Використовується: головна сторінка сайту
// Опис: Відображає лейаут, панель фіч, сітку готелів, відгуки, CTA
// ============================================

import React, { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "./Home.css";
import { getHotels } from "../../services/hotelService";
import { getComments } from "../../services/commentService";
import { HotelView } from "../../models/HotelView";
import ContentFeaturePanel, {
  FeatureItemData,
} from "../ui/ContentFeaturePanel";
import ReviewsPanel from "../ui/ReviewsPanel";
import SafeWithUs from "../ui/SafeWithUs";
import RegularPanel from "../ui/RegularPanel";
import RegisterCTA from "../ui/RegisterCTA";

// ============================================
// Компонент: Home
// ============================================
export default function Home(): JSX.Element {
  const hotels: HotelView[] = getHotels();
  const comments = getComments();
  const background = "/icons/layout_imgs/header-img@2x.png";

  const homeFeatures: FeatureItemData[] = [
    { title: "Easy Booking", iconSrc: "/icons/briefcase.svg" },
    { title: "Secure payment", iconSrc: "/icons/lock.svg" },
    { title: "Relevant information", iconSrc: "/icons/receipt.svg" },
  ];

  return (
    <MainLayout background={background}>
      {/* Панель фіч */}
      <ContentFeaturePanel
        features={homeFeatures}
        ariaLabel="Main page features"
      />

      {/* Основний контент сторінки */}
      <main className="page-content">
        <HotelGrid hotels={hotels} />
        <ReviewsPanel comments={comments} />
        <SafeWithUs />
        <RegularPanel />
        <RegisterCTA />
      </main>
    </MainLayout>
  );
}

// ============================================
// Компонент: HotelGrid
// Опис: Відображає сітку готелів
// ============================================
function HotelGrid({ hotels }: { hotels: HotelView[] }) {
  return (
    <div className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

// ============================================
// Компонент: HotelCard
// Опис: Відображає окрему картку готелю з слайдом зображень, рейтингом і ціною.
//        При кліку на картку (крім кнопок) редіректить на /hotel
// ============================================
function HotelCard({ hotel }: { hotel: HotelView }) {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".favorite-btn") || target.closest(".dot")) return;

    navigate("/hotel");
  };

  return (
    <div
      className="hotel-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      {/* Зображення готелю */}
      <div className="hotel-image-wrapper">
        <img
          src={hotel.images[currentImage]}
          alt={hotel.name}
          className="hotel-image"
        />
        <button className="favorite-btn" aria-label="Add to favorites">
          ★
        </button>
        <div className="image-dots">
          {hotel.images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(i)}
            ></span>
          ))}
        </div>
      </div>

      {/* Інформація про готель */}
      <div className="hotel-info">
        <div className="hotel-name">
          {hotel.name} | {hotel.city} | {hotel.country}
        </div>
        <div className="hotel-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`star ${i < Math.round(hotel.rating) ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
        <div className="hotel-distance">
          The city center: {hotel.distance_to_center_km} km
        </div>
        <div className="hotel-price">${hotel.price_per_night} / night</div>
      </div>
    </div>
  );
}
