// ============================================
// Компонент: PhotoGallery
// Опис: Галерея фотографій готелю з навігацією
// ============================================

import React, { useState } from 'react';
import './HotelGallery.css';

interface PhotoGalleryProps {
  images: string[];
  hotelName: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images, hotelName }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Перехід до наступного фото
  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);

  // Перехід до попереднього фото
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="photo-gallery">
      {/* Головне зображення з кнопками навігації */}
      <div className="main-image-wrapper">
        <button className="nav-btn nav-btn-left" onClick={prevImage} aria-label="Previous image">
          <img src="/icons/ui/back.svg" className="prev-img" alt="Prev" />
        </button>

        <div className="main-image">
          <img src={images[selectedImage]} alt={`${hotelName} - View ${selectedImage + 1}`} />
        </div>

        <button className="nav-btn nav-btn-right" onClick={nextImage} aria-label="Next image">
          <img src="/icons/ui/back.svg" className="next-img" alt="Next" />
        </button>
      </div>

      {/* Мініатюри */}
      <div className="thumbnails-grid">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
            aria-label={`View image ${idx + 1}`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;