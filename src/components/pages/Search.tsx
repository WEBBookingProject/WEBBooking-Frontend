// ============================================
// Компонент: Search
// Опис: Cторінка пошуку з компонентами панелі фільтрів та виводу списку готелей
// ============================================
import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import ContentFeaturePanel, {
  FeatureItemData,
} from "../ui/ContentFeaturePanel";
import FilterPanel from "../ui/FilterPanel";
import HotelList from "../ui/HotelList";
import { HotelView } from "../../models/HotelView";
import { searchHotels } from "../../services/hotelService";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const background = "/icons/layout_imgs/header-img-search.png";
  const [hotels, setHotels] = useState<HotelView[]>([]);
  const navigate = useNavigate();

  const searchFeatures: FeatureItemData[] = [
    { title: "Easy Booking", iconSrc: "/icons/ui/medalstar.svg" },
    { title: "Secure payment", iconSrc: "/icons/ui/link21.svg" },
    { title: "Relevant information", iconSrc: "/icons/ui/buildings2.svg" },
  ];

  useEffect(() => {
    const fetchAllHotels = async () => {
      try {
        const allHotels = await searchHotels();
        setHotels(allHotels);
      } catch (error) {
        console.error("Failed to load hotels:", error);
      }
    };

    fetchAllHotels();
  }, []);

  return (
    <MainLayout background={background}>
      <ContentFeaturePanel
        features={searchFeatures}
        ariaLabel="Search page features"
      />

      <div className="search-page-container">
        {/* Ліва панель */}
        <div className="search-left-panel">
          <button
            className="see-map-btn"
            aria-label="See the map"
            onClick={() => navigate("/map")}
          ></button>

          {/* Панель фільтрів */}
          <FilterPanel onApplyFilters={setHotels} />
        </div>

        {/* Права панель */}
        <div className="search-right-panel">
          <HotelList hotels={hotels} />
        </div>
      </div>
    </MainLayout>
  );
}
