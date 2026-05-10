export type PropertyType = "Villa" | "Apartment" | "Townhouse" | "Studio";

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  status: "Available" | "Sold" | "Pending";
  representativeId?: number;
  img: string;
}

export interface Representative {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: number;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Tour {
  id: number;
  clientId: number;
  propertyId: number;
  representativeId: number;
  date: string; 
  time: string;
}

export interface Agreement {
  id: number;
  clientId: number;
  representativeId: number;
  propertyId: number;
  price: number;
  date: string; 
}