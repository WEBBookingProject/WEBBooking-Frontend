import { HotelView } from "../models/HotelView";

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

export async function getTop10Hotels(): Promise<HotelView[]> {
  return fetchData<HotelView[]>(`${API_BASE_URL}/properties/GetTop10ForRating`);
}

export async function getHotelById(id: string): Promise<HotelView> {
  const url = `${API_BASE_URL}/properties/GetById?id=${encodeURIComponent(id)}`;
  return fetchData<HotelView>(url);
}

export async function searchHotels(filters?: {
  minPrice?: number;
  maxPrice?: number;
  parkingPlaces?: number;
  apartamentSize?: number;
  rating?: number;
  type?: string;
  category?: string;
  kitchen?: boolean;
  wifi?: boolean;
  freeWifi?: boolean;
}): Promise<HotelView[]> {
  const params = new URLSearchParams();
  if (filters) {
    if (filters.minPrice !== undefined) params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append("maxPrice", filters.maxPrice.toString());
    if (filters.parkingPlaces !== undefined) params.append("parkingPlaces", filters.parkingPlaces.toString());
    if (filters.apartamentSize !== undefined) params.append("apartamentSize", filters.apartamentSize.toString());
    if (filters.rating !== undefined) params.append("rating", filters.rating.toString());
    if (filters.type) params.append("type", filters.type);
    if (filters.category) params.append("category", filters.category);
    if (filters.kitchen !== undefined) params.append("kitchen", filters.kitchen.toString());
    if (filters.wifi !== undefined) params.append("wifi", filters.wifi.toString());
    if (filters.freeWifi !== undefined) params.append("freeWifi", filters.freeWifi.toString());
  }

  const url = `${API_BASE_URL}/properties/SearchProperties?${params.toString()}`;
  return fetchData<HotelView[]>(url);
}

export async function searchByNameAndAddress(name: string, address?: string): Promise<HotelView[]> {
  const params = new URLSearchParams();
  params.append("name", name);
  if (address) params.append("address", address);
  const url = `${API_BASE_URL}/properties/SearchByNameAndAddress?${params.toString()}`;
  return fetchData<HotelView[]>(url);
}
