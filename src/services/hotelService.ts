import { HotelView } from "../models/HotelView";
import { BookingRequest, ClientRequest, Client } from "../models/BookingModels";

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

// Для запитів, які не повертають JSON
async function fetchWithoutJSON(url: string, options?: RequestInit): Promise<void> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} - ${errorText}`);
  }
  return;
}

// Отримання топ-10 готелів за рейтингом
export async function getTop10Hotels(): Promise<HotelView[]> {
  return fetchData<HotelView[]>(`${API_BASE_URL}/properties/GetTop10ForRating`);
}

// Отримання готелю за його ідентифікатором
export async function getHotelById(id: string): Promise<HotelView> {
  const url = `${API_BASE_URL}/properties/GetById?id=${encodeURIComponent(id)}`;
  return fetchData<HotelView>(url);
}

// Пошуку готелів за різними фільтрами
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

// Пошуку готелів за назвою та адресою
export async function searchByNameAndAddress(name: string, address?: string): Promise<HotelView[]> {
  const params = new URLSearchParams();
  params.append("name", name);
  if (address) params.append("address", address);
  const url = `${API_BASE_URL}/properties/SearchByNameAndAddress?${params.toString()}`;
  return fetchData<HotelView[]>(url);
}

// Отримання клієнта за номером телефону
export async function getClientByPhoneNumber(phoneNumber: number): Promise<Client | null> {
  try {
    const url = `${API_BASE_URL}/client/GetClientByPhoneNumber?phoneNumber=${phoneNumber}`;
    const client = await fetchData<Client>(url);
    return client;
  } catch (error) {
    return null;
  }
}

// Створення нового клієнта
export async function createClient(clientData: ClientRequest): Promise<Client> {
  const params = new URLSearchParams();
  params.append("fullName", clientData.fullName);
  params.append("phoneNumber", clientData.phoneNumber.toString());
  params.append("email", clientData.email);

  const url = `${API_BASE_URL}/client/AddClient?${params.toString()}`;
  
  await fetchWithoutJSON(url, {
    method: "POST",
  });

  const createdClient = await getClientByPhoneNumber(clientData.phoneNumber);
  if (!createdClient) {
    throw new Error("Failed to retrieve created client");
  }
  
  return createdClient;
}

// Створення нового бронювання
export async function createBooking(bookingData: BookingRequest): Promise<void> {
  const params = new URLSearchParams();
  
  params.append("propertyId", bookingData.propertyId);
  params.append("totalPrice", bookingData.totalPrice.toString());
  params.append("startDate", bookingData.startDate);
  params.append("endDate", bookingData.endDate);
  params.append("status", (bookingData.status ?? 0).toString()); 
  
  if (bookingData.userId) {
    params.append("userId", bookingData.userId);
  }
  if (bookingData.clientId) {
    params.append("clientId", bookingData.clientId);
  }

  const url = `${API_BASE_URL}/booking/CreateNewBooking?${params.toString()}`;

  await fetchWithoutJSON(url, {
    method: "POST",
  });
}