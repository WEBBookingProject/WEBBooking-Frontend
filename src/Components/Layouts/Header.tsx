import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBox from "./SearchBox";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      {/* Верхній блок: логотип + кнопки */}
      <div className="header-top">
        <div className="logo">
          <span>Hotel for </span>
          <span className="highlightCOLOR"> you.</span>
        </div>

        <div className="header-actions">
          <button className="lang-btn" aria-label="Change language"></button>
          <button className="header-btn" onClick={() => navigate("/register")}>Register</button>
          <button className="header-btn" onClick={() => navigate("/signin")}>Sign In</button>
        </div>
      </div>

      {/* Фонове зображення */}
      <img
        src="/icons/layout_imgs/header-img@2x.png"
        alt="header img"
        className="header-img"
      />

      {/* Панель пошуку поверх картинки */}
      <div className="header-search-wrapper">
        <SearchBox />
      </div>
    </header>
  );
}
