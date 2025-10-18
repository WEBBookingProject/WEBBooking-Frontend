// Статуси бронювання
export enum BookingStatus {
  Pending = 1,
  Confirmed = 2,
  Cancelled = 3
}

// Дані клієнта для бронювання
export interface ClientData {
  fullName: string;
  phone: string;
  email: string;
}

// Запит на створення бронювання
export interface CreateBookingRequest {
  propertyId: string;
  clientData: ClientData;
  totalPrice: number;
  startDateForBooking: string; 
  endDateForBooking: string; 
  roomType?: string;
}

// Відповідь від сервера після створення бронювання
export interface BookingResponse {
  id: string;
  userId: string;
  propertyId: string;
  clientId: string;
  totalPrice: number;
  startDateForBooking: string;
  endDateForBooking: string;
  status: BookingStatus;
  createdAt?: string;
}