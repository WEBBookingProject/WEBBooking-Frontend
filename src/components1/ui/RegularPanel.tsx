// ============================================
// Файл: src/components/ui/RegularPanel.tsx
// Компонент: RegularPanel
// Використовується: на HomePage
// Призначення: блок "Be our regular" з зображенням та текстом
// ============================================

import "./RegularPanel.css";

const imageSrc = "/icons/ui/Rectangle 17.svg";
const text =
  "We believe that every customer deserves the best, and we're committed to providing top-class services to all of our clients. When you book with us, you can enjoy not only great deals on your travel arrangements, but also exclusive discounts and special offers. We value your loyalty and want to show our appreciation by giving back. So start your search today and discover the amazing rewards waiting for you on our website!";

export default function RegularPanel() {
  return (
    <div className="regular-panel">
      <h2 className="regular-title">Be our regular</h2>
      <div className="regular-container">
        <img src={imageSrc} alt="img" className="regular-image" />
        <div className="regular-text">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
