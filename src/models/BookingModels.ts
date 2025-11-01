export interface BookingRequest {
  propertyId: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  status?: number;
  userId?: string;
  clientId?: string;
}

export interface ClientRequest {
  fullName: string;
  phoneNumber: number;
  email: string;
}

export interface Client {
  id: string;
  fullName: string;
  phoneNumber: number;
  email: string;
  bookingHistory: string[];
}