import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayoutDetails";
import { getHotelById } from "../../services/hotelService";
import { HotelView } from "../../models/HotelView";
import HotelHeader from "../ui/HotelHeader";
import HotelGallery from "../ui/HotelGallery";
import HotelInfoPanel from "../ui/HotelInfoPanel";
import HotelReviews from "../ui/HotelReviews";
import HotelFacilities from "../ui/HotelFacilities";
import HotelRooms from "../ui/HotelRooms";
import HotelFAQ from "../ui/HotelFAQ";
import { CommentView } from "../../models/CommentView";
import testCommentsData from "../../data/TestFiles/testComments.json";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<HotelView | null>(null);

  useEffect(() => {
    if (id) {
      getHotelById(id)
        .then(h => setHotel(h))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!hotel) {
    return (
      <div className="details-not-found">
        <h2>Hotel not found</h2>
        <button onClick={() => navigate("/search")} className="btn-primary">
          Back to Search
        </button>
      </div>
    );
  }

  const testComments: CommentView[] = testCommentsData as CommentView[];

  return (
    <MainLayout>
      <header className="details-header">
        <HotelHeader name={hotel.name} rating={hotel.rating} onBack={() => navigate(-1)} />
      </header>

      <main className="details-page">
        <div className="details-container">
          <section className="hero-section">
            <HotelGallery images={hotel.photos} hotelName={hotel.name} />
            <HotelInfoPanel hotel={hotel} />
          </section>

          <HotelFacilities hotel={hotel} />
          <HotelRooms hotel={hotel} />
          <HotelReviews hotel={hotel} comments={testComments} />
          <HotelFAQ hotel={hotel} />
        </div>
      </main>
    </MainLayout>
  );
};

export default DetailsPage;
