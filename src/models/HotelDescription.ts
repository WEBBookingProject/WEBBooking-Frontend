export interface HotelDescription {
  id: string;
  text: string;
  type: string;
  location: string;
  sleepingArrangements: number;
  appartamentSize: number; // у м²
  wiFi: boolean;
  freeWiFi: boolean;
  parkingPlaces: number;
  kitchen: boolean;
}