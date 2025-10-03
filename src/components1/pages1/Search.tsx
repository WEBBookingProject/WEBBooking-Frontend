/* ============================================ */
// Файл: src/components/pages/Search.tsx
/* Компонент: Search                            */
/* Призначення: сторінка пошуку готелів        */
/* ============================================ */

import React, { JSX } from "react";
import MainLayout from "../layouts1/MainLayout";
import ContentFeaturePanel, {
  FeatureItemData,
} from "../ui/ContentFeaturePanel";
import FilterPanel from "../ui/FilterPanel";
import HotelList from "../ui/HotelList";
import { HotelView } from "../../models/HotelView";
import { getHotels } from "../../services/hotelService";
import "./Search.css";
import { useNavigate } from "react-router-dom";

export default function Search(): JSX.Element {
  const background = "/icons/layout_imgs/header-img-search.png";

  // Фічі верхньої панелі сторінки
  const searchFeatures: FeatureItemData[] = [
    { title: "Easy Booking", iconSrc: "/icons/ui/medalstar.svg" },
    { title: "Secure payment", iconSrc: "/icons/ui/link21.svg" },
    { title: "Relevant information", iconSrc: "/icons/ui/buildings2.svg" },
  ];

  // Беремо 7 готелів для відображення
  const hotels: HotelView[] = getHotels().slice(0, 7);
  const navigate = useNavigate();
  return (
    <MainLayout background={background}>
      {/* Верхня панель з фічами */}
      <ContentFeaturePanel
        features={searchFeatures}
        ariaLabel="Search page features"
      />

      {/* Основний контейнер сторінки: ліва панель + права панель */}
      <div className="search-page-container">
        {/* Ліва панель: кнопка "See the map" та фільтри */}
        <div className="search-left-panel">
          <button
            className="see-map-btn"
            aria-label="See the map"
            onClick={() => navigate("/map")}
          ></button>
          <FilterPanel />
        </div>

        {/* Права панель: список готелів */}
        <div className="search-right-panel">
          <HotelList hotels={hotels} />
        </div>
      </div>
    </MainLayout>
  );
}
