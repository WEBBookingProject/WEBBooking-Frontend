// ============================================
// Компонент: PlaceholderPage
// Опис: заглушка
// ============================================
import React from "react";
import { useParams } from "react-router-dom";

interface Props {
  title: string;
}

const PlaceholderPage: React.FC<Props> = ({ title }) => {
  const params = useParams<{ id: string }>();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{title}</h1>
      {params.id && <p>ID об'єкта: {params.id}</p>}
      <p>Сторінка ще в розробці</p>
      <img
        src="/icons/placeholder.gif"
        alt="placeholder"
        style={{ maxWidth: "500px", width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default PlaceholderPage;
