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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const toggleMobileFilter = () => setIsFilterOpen((s) => !s);

  return (
    <MainLayout background={background}>
      <ContentFeaturePanel
        features={searchFeatures}
        ariaLabel="Search page features"
      />

      {/* Верхній блок - моб*/}
      <div
        className={`top-mobBtn-container ${isFilterOpen ? "filter-open" : ""}`}
      >
        <button
          className={`see-filterpanel-btn ${isFilterOpen ? "active" : ""}`}
          aria-label="Filters"
          onClick={toggleMobileFilter}
        >
          Filters
        </button>
        <button
          className="see-map-mobbtn"
          aria-label="See the map"
          onClick={() => navigate("/map")}
        >
          See the map
        </button>
      </div>

      <div className="search-page-container">
        {/* Ліва панель */}
        <div className="search-left-panel">
          <button
            className="see-map-btn"
            aria-label="See the map"
            onClick={() => navigate("/map")}
          />

          {/* Панель фільтрів */}
          <div className={`filter-panel-wrapper ${isFilterOpen ? "open" : ""}`}>
            <FilterPanel
              onApplyFilters={(newHotels) => {
                console.log("onApplyFilters called with:", newHotels);
                setHotels(newHotels);
                setIsFilterOpen(false);
              }}
            />
          </div>
        </div>

        {/* Права панель */}
        <div className="search-right-panel">
          <HotelList hotels={hotels} />
        </div>
      </div>
    </MainLayout>
  );
}
