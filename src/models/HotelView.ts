import { HotelDescription } from "./HotelDescription";

export interface HotelView {
  id: string;
  authorId: string;
  name: string;
  description: HotelDescription | null;
  priceForDay: number;
  maxGuests: number;
  rating: number;
  address: string;
  latitudeCoordinate: number;
  longitudeCoordinate: number;
  category: string;
  photos: string[];
  createdAt: string;
  contactPhone: string;
  contactEmail: string;
}
