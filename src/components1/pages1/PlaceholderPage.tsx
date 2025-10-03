// ============================================
// Файл: src/components/pages/PlaceholderPage.tsx
// Використовується: Заглушка
// ============================================
import React from "react";

interface Props {
  title: string;
}

const PlaceholderPage: React.FC<Props> = ({ title }) => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{title}</h1>
      <p>Сторінка ще в розробці</p>
      <img
        src="/icons/placeholder.gif"
        alt="placeholder"
        style={{ maxWidth: "500px" }}
      />
    </div>
  );
};

export default PlaceholderPage;
