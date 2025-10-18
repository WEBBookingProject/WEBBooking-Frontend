// ============================================
// Компонент: Home
// Опис: Головна сторінка сайту топ готелей, 3 головні коментарі, опис
// ============================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "./Home.css";
import { getTop10Hotels } from "../../services/hotelService";
import { getComments } from "../../services/commentService";
import { HotelView } from "../../models/HotelView";
import ContentFeaturePanel, {
  FeatureItemData,
} from "../ui/ContentFeaturePanel";
import ReviewsPanel from "../ui/ReviewsPanel";
import SafeWithUs from "../ui/SafeWithUs";
import RegularPanel from "../ui/RegularPanel";
import RegisterCTA from "../ui/RegisterCTA";

export default function Home() {
  const [hotels, setHotels] = useState<HotelView[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const background = "/icons/layout_imgs/header-img@2x.png";

  const homeFeatures: FeatureItemData[] = [
    { title: "Easy Booking", iconSrc: "/icons/briefcase.svg" },
    { title: "Secure payment", iconSrc: "/icons/lock.svg" },
    { title: "Relevant information", iconSrc: "/icons/receipt.svg" },
  ];

  useEffect(() => {
    async function fetchTopHotels() {
      try {
        const topHotels = await getTop10Hotels();
        setHotels(topHotels.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch top hotels:", error);
      }
    }

    async function fetchComments() {
      try {
        const comms = await getComments();
        setComments(comms);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    fetchTopHotels();
    fetchComments();
  }, []);

  return (
    <MainLayout background={background}>
      <ContentFeaturePanel
        features={homeFeatures}
        ariaLabel="Main page features"
      />

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

// --- HotelGrid ---
function HotelGrid({ hotels }: { hotels: HotelView[] }) {
  const groupedHotels = [];
  for (let i = 0; i < hotels.length; i += 2) {
    groupedHotels.push(hotels.slice(i, i + 2));
  }

  return (
    <div className="hotel-grid-wrapper">
      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card-wrapper">
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- HotelCard ---
function HotelCard({ hotel }: { hotel: HotelView }) {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".favorite-btn") || target.closest(".dot")) return;
    navigate(`/hotel/${hotel.id}`);
  };

  const ratingStars = Math.round(hotel.rating / 2);

  return (
    <div
      className="hotel-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <div className="hotel-image-wrapper">
        <img
          src={hotel.photos?.[currentImage] || "/images/default-hotel.jpg"}
          alt={hotel.name}
          className="hotel-image"
        />
        <button className="favorite-btn" aria-label="Add to favorites">
          ★
        </button>
        <div className="image-dots">
          {hotel.photos?.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(i)}
            />
          ))}
        </div>
      </div>

      <div className="hotel-info">
        <div className="hotel-name">
          {hotel.name} | {hotel.address}
        </div>
        <div className="hotel-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`star ${i < ratingStars ? "filled" : ""}`}>
              ★
            </span>
          ))}
        </div>
        <div className="hotel-distance">Distance to center: approx.</div>
        <div className="hotel-price">${hotel.priceForDay} / night</div>
      </div>
    </div>
  );
}
