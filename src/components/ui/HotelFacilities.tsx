// ============================================
// Компонент: HotelFacilities
// Опис: Відображає перелік зручностей готелю
// ============================================

import React from 'react';
import { HotelView } from '../../models/HotelView';
import './HotelFacilities.css';

interface Props {
  hotel: HotelView;
}

const HotelFacilities: React.FC<Props> = ({ hotel }) => {
  if (!hotel.facilities?.length) return null;

  return (
    <section className="content-section">
      {/* Заголовок блоку */}
      <h2 className='tittleF'>Facilities</h2>

      {/* Сітка зручностей */}
      <div className="amenities-grid">
        {hotel.facilities.map((f, i) => (
          <div key={i} className="amenity-item">✓ {f}</div>
        ))}
      </div>
    </section>
  );
};

export default HotelFacilities;