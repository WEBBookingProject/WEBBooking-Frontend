import { HotelView } from "../models/HotelView";
import rawHotelsJson from "../data/TestFiles/testObjects.json";

export function getHotels(): HotelView[] {
  return (rawHotelsJson as HotelView[]).map((hotel, index) => ({
    ...hotel,
    id: index.toString(),
  }));
}

// Функція для отримання готелю за його ID
export function getHotelById(id: string): HotelView | undefined {
  const hotels = getHotels(); 
  return hotels.find((hotel) => hotel.id === id); 
}

export function searchHotels(
  maxPrice: number,
  rating?: number,
  types?: string[],       
  categories?: string[],
  facilities?: string[]
): HotelView[] {
  const hotels = getHotels();

  return hotels
    .filter((h) => h.price_per_night <= maxPrice)
    .filter((h) => (rating ? h.rating >= rating : true))
    .filter((h) => (types && types.length ? types.includes(h.type) : true)) 
    .filter((h) =>
      categories && categories.length ? categories.includes(h.category) : true
    )
    .filter((h) =>
      facilities && facilities.length
        ? facilities.every((f) => h.facilities.includes(f))
        : true
    )
    .slice(0, 7);
}

