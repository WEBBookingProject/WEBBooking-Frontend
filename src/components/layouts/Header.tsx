// ============================================
// Компонент: Header
// Використовується: на MainLayout
// Опис: Верхній блок сайту з логотипом, кнопками навігації, фоновим зображенням та панеллю пошуку
// ============================================

import { useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBox from "./SearchBox";

interface HeaderProps {
  bgImage?: string;
}

export default function Header({ bgImage }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Верхній блок: логотип та кнопки дій */}
      <div className="header-top">
        <div className="logo">
          <span>Hotel for </span>
          <span className="highlightCOLOR"> you.</span>
        </div>

        <div className="header-actions">
          <button className="lang-btn" aria-label="Change language"></button>
          <button className="header-btn" onClick={() => navigate("/register")}>
            Register
          </button>
          <button className="header-btn" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </div>
      </div>

      {/* Фонове зображення */}
      {bgImage && <img src={bgImage} alt="header img" className="header-img" />}

      {/* Панель пошуку поверх фону */}
      <div className="header-search-wrapper">
        <SearchBox />
      </div>
    </header>
  );
}
