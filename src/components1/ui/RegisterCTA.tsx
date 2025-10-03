// ============================================
// Файл: src/components/ui/RegisterCTA.tsx
// Компонент: RegisterCTA
// Використовується: на HomePage
// Призначення: кнопка з двома іконками для реєстрації користувача
// ============================================

import "./RegisterCTA.css";
import { useNavigate } from "react-router-dom";

const leftIcon = "/icons/ui/flag_l.svg";
const rightIcon = "/icons/ui/flag_r.svg";

export default function RegisterCTA() {
  const navigate = useNavigate();

  return (
    <div className="register-cta">
      <img src={leftIcon} alt="flag_l" className="cta-icon" />
      <button className="cta-button" onClick={() => navigate("/register")}>
        Register an account
      </button>
      <img src={rightIcon} alt="flag_r" className="cta-icon" />
    </div>
  );
}
