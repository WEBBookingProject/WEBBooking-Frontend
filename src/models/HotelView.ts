export interface HotelView {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  distance_to_center_km: number;
  price_per_night: number;
  type: string; 
  category: string;
  facilities: string[];
  images: string[];
  mainImage: string; 
  description: string;
}
