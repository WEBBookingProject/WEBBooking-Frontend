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
    iconUrl: "/icons/ui/buildings.svg",
    text: "We choose hotels that meet our standards",
  },
  {
    id: 2,
    iconUrl: "/icons/ui/convertcard.svg",
    text: "Secure payment without hidden fees",
  },
  {
    id: 3,
    iconUrl: "/icons/ui/tag.svg",
    text: "Сurrent prices and best deals",
  },
  {
    id: 4,
    iconUrl: "/icons/ui/clock.svg",
    text: "Easy booking which will not take you long",
  },
  {
    id: 5,
    iconUrl: "/icons/ui/directinbox.svg",
    text: "We'll promptly email booking confirmation.",
  },
];

export default function SafeWithUs() {
  return (
    <div className="safe-panel">
      <h2 className="safe-title">Safe With Us</h2>

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
