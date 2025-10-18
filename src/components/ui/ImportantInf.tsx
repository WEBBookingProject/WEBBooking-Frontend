// ============================================
// Компонент: SafeWithUs
// Використовується: на HomePage
// Призначення: відображає блок "Safe With Us" з іконками та текстом
// ============================================

import "./SafeWithUs.css";

interface SafeItem {
  id: number;
  iconUrl: string;
  text: string;
}

const safeItems: SafeItem[] = [
  {
    id: 1,
    iconUrl: "/icons/ui/clock.svg",
    text: "Check-in time from 15:00 to 23:00",
  },
  {
    id: 2,
    iconUrl: "/icons/ui/bedroom.svg",
    text: "Maximum number of extra beds 1",
  },
  {
    id: 3,
    iconUrl: "/icons/ui/house.svg",
    text: "City center 45 m",
  },
  {
    id: 4,
    iconUrl: "/icons/ui/train.svg",
    text: "Train station 356 m Airport 543 m",
  },
  {
    id: 5,
    iconUrl: "/icons/ui/pat.svg",
    text: "Pets are allowed No extra charge.",
  },
];

export default function ImportantInf() {
  return (
    <div className="safe-panel">
      <h2 className="tittle">Important information</h2>

      <div className="safe-grid">
        {safeItems.map((item) => (
          <div key={item.id} className="safe-card">
            <img src={item.iconUrl} alt={item.text} className="safe-icon" />
            <p className="safe-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
