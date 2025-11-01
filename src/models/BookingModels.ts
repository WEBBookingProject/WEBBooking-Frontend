export interface BookingRequest {
  propertyId: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  status?: number;
  userId?: string;
  clientId?: string;
}