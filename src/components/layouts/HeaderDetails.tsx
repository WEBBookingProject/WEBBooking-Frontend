// ============================================ 
// Файл: src/components/layouts/Header.tsx
// Компонент: Header
// Використовується: на MainLayout
// Опис: Верхній блок сайту з логотипом, кнопками навігації, фоновим зображенням та панеллю пошуку
// ============================================

import { useNavigate } from "react-router-dom";
import "./Header.css";
import "./HeaderDetails.css";

interface HeaderProps {
  bgImage?: string;
}

export default function Header({ bgImage }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
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
    </header>
  );
}


