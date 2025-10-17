import { HotelView} from "../models/HotelView";


const API_BASE_URL = "https://localhost:7073/api";


async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// --- отримати топ 10 готелів ---
export async function getTop10Hotels(): Promise<HotelView[]> {
  return fetchData<HotelView[]>(`${API_BASE_URL}/properties/GetTop10ForRating`);
}

// --- отримати готель по ID ---
export async function getHotelById(id: string): Promise<HotelView> {
  const url = `${API_BASE_URL}/properties/GetById?id=${encodeURIComponent(id)}`;
  return fetchData<HotelView>(url);
}

// --- пошук готелів за фільтрами ---
export async function searchHotels(filters?: {
  minPrice?: number;
  maxPrice?: number;
  parkingPlaces?: number;
  apartamentSize?: number;
  rating?: number;
  category?: string;
  kitchen?: boolean;
  wifi?: boolean;
  freeWifi?: boolean;
}): Promise<HotelView[]> {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.minPrice != null) params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice != null) params.append("maxPrice", filters.maxPrice.toString());
    if (filters.parkingPlaces != null) params.append("parkingPlaces", filters.parkingPlaces.toString());
    if (filters.apartamentSize != null) params.append("apartamentSize", filters.apartamentSize.toString());
    if (filters.rating != null) params.append("rating", filters.rating.toString());
    if (filters.category) params.append("category", filters.category);
    if (filters.kitchen != null) params.append("kitchen", filters.kitchen.toString());
    if (filters.wifi != null) params.append("wifi", filters.wifi.toString());
    if (filters.freeWifi != null) params.append("freeWifi", filters.freeWifi.toString());
  }

  const url = `${API_BASE_URL}/properties/SearchProperties?${params.toString()}`;

  const response = await fetch(url, { method: "POST" });
  if (!response.ok) throw new Error(`Search request failed: ${response.status}`);

  return response.json() as Promise<HotelView[]>;
}
