// ============================================
// Файл: src/components/pages/DetailsPage.tsx
// Компонент: DetailsPage
// Використовується: для перегляду інформації про конкретний готель
// Опис: Містить галерею, інформацію, відгуки, кімнати, FAQ та інші блоки
// ============================================

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayoutDetails";
import { getHotels } from "../../services/hotelService";
import { HotelView } from "../../models/HotelView";
import HotelHeader from "../ui/HotelHeader";
import HotelGallery from "../ui/HotelGallery";
import HotelInfoPanel from "../ui/HotelInfoPanel";
import HotelReviews from "../ui/HotelReviews";
import HotelFacilities from "../ui/HotelFacilities";
import HotelRooms from "../ui/HotelRooms";
import HotelFAQ from "../ui/HotelFAQ";
import { CommentView } from "../../models/CommentView";
import testCommentsData from "../../data/TestFiles/testComments.json";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Отримання готелів і вибір потрібного
  const hotels = getHotels();
  const hotel = hotels.find(h => h.id === id);

  // Якщо готель не знайдено
  if (!hotel) {
    return (
      <div className="details-not-found">
        <h2>Hotel not found</h2>
        <button onClick={() => navigate("/search")} className="btn-primary">
          Back to Search
        </button>
      </div>
    );
  }

  // Дані для відгуків
  const testComments: CommentView[] = testCommentsData as CommentView[];

  // Основна структура сторінки
  return (
    <MainLayout>
      {/* Заголовок сторінки */}
      <header className="details-header">
        <HotelHeader name={hotel.name} rating={hotel.rating} onBack={() => navigate(-1)} />
      </header>

      {/* Основний контент */}
      <main className="details-page">
        <div className="details-container">
          {/* Блок із фото та основною інформацією */}
          <section className="hero-section">
            <HotelGallery images={hotel.images} hotelName={hotel.name} />
            <HotelInfoPanel hotel={hotel} />
          </section>

          {/* Додаткові секції */}
          <HotelFacilities hotel={hotel} />
          <HotelRooms hotel={hotel} />
          <HotelReviews hotel={hotel} comments={testComments} />
          <HotelFAQ hotel={hotel} />
        </div>
      </main>
    </MainLayout>
  );
};

export default DetailsPage;
