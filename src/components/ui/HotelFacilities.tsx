// ============================================
// Компонент: HotelFacilities
// Опис: Відображає перелік зручностей готелю
// ============================================

import React from "react";
import { HotelView } from "../../models/HotelView";
import "./HotelFacilities.css";

interface Props {
  hotel: HotelView;
}

const HotelFacilities: React.FC<Props> = ({ hotel }) => {
  const desc = hotel.description;
  if (!desc) return null;

  const facilities: {
    key: string;
    icon: string;
    label: string;
    status?: string;
  }[] = [];

  // Wi-Fi
  if (desc.wiFi) {
    facilities.push({
      key: "wifi",
      icon: "/icons/ui/internet.svg",
      label: "Internet",
      status: desc.freeWiFi ? "✓ Free" : "✓ Paid",
    });
  }

  // Kitchen
  if (desc.kitchen) {
    facilities.push({
      key: "kitchen",
      icon: "/icons/ui/kitchen.svg",
      label: "Kitchen",
      status: "✓ Available",
    });
  }

  // Parking
  if (desc.parkingPlaces && desc.parkingPlaces > 0) {
    facilities.push({
      key: "parking",
      icon: "/icons/ui/parking.svg",
      label: "Parking",
      status: `✓ ${desc.parkingPlaces} places`,
    });
  }

  // Bedrooms
  if (desc.sleepingArrangements && desc.sleepingArrangements > 0) {
    facilities.push({
      key: "sleeping",
      icon: "/icons/ui/bedroom.svg",
      label: "Bedrooms",
      status: `✓ ${desc.sleepingArrangements} spots`,
    });
  }

  // Size
  if (desc.appartamentSize && desc.appartamentSize > 0) {
    facilities.push({
      key: "size",
      icon: "/icons/ui/house.svg",
      label: "Space",
      status: `✓ ${desc.appartamentSize} m²`,
    });
  }

  if (facilities.length === 0) return null;

  return (
    <section className="content-section">
      <h2 className="tittle">Facilities</h2>
      <div className="amenities-grid">
        {facilities.map((f) => (
          <div key={f.key} className="amenity-item">
            <img src={f.icon} className="amenity-icon" />
            <div className="amenity-text">
              <strong>{f.label}</strong>
              {f.status && <p className="amenity-status">{f.status}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelFacilities;
