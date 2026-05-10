import { Property, Representative, Client, Tour, Agreement } from './types';

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Skyline Penthouse Residence",
    location: "New Cairo, Egypt",
    price: 4_850_000,
    type: "Apartment",
    beds: 4,
    baths: 3,
    sqft: 3200,
    status: "Available",
    representativeId: 1,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
  },
  {
    id: 2,
    title: "Modern Garden Villa",
    location: "Sheikh Zayed, Giza",
    price: 7_200_000,
    type: "Villa",
    beds: 5,
    baths: 4,
    sqft: 5100,
    status: "Available",
    representativeId: 2,
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
  },
  {
    id: 3,
    title: "Cozy Downtown Studio",
    location: "Zamalek, Cairo",
    price: 980_000,
    type: "Studio",
    beds: 1,
    baths: 1,
    sqft: 650,
    status: "Sold",
    representativeId: 1,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
  },
  {
    id: 4,
    title: "Lakeside Townhouse",
    location: "6th of October, Giza",
    price: 2_450_000,
    type: "Townhouse",
    beds: 3,
    baths: 2,
    sqft: 2200,
    status: "Pending",
    representativeId: 3,
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
  },
  {
    id: 5,
    title: "Nile View Apartment",
    location: "Corniche, Cairo",
    price: 3_100_000,
    type: "Apartment",
    beds: 3,
    baths: 2,
    sqft: 2400,
    status: "Available",
    representativeId: 2,
    img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=900&q=80",
  },
];

export const mockRepresentatives: Representative[] = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@residential.com",
    phone: "+20 123 456 7890",
    experience: 8,
  },
  {
    id: 2,
    name: "Sara Mohamed",
    email: "sara.mohamed@residential.com",
    phone: "+20 123 456 7891",
    experience: 6,
  },
  {
    id: 3,
    name: "Mohamed Ali",
    email: "mohamed.ali@residential.com",
    phone: "+20 123 456 7892",
    experience: 10,
  },
];

export const mockClients: Client[] = [
  {
    id: 1,
    name: "Fatima El-Sayed",
    email: "fatima.elsayed@email.com",
    phone: "+20 111 222 3333",
  },
  {
    id: 2,
    name: "Omar Hassan",
    email: "omar.hassan@email.com",
    phone: "+20 111 222 3334",
  },
  {
    id: 3,
    name: "Layla Mahmoud",
    email: "layla.mahmoud@email.com",
    phone: "+20 111 222 3335",
  },
];

export const mockTours: Tour[] = [
  {
    id: 1,
    clientId: 1,
    propertyId: 1,
    representativeId: 1,
    date: "2024-05-15",
    time: "10:00",
  },
  {
    id: 2,
    clientId: 2,
    propertyId: 2,
    representativeId: 2,
    date: "2024-05-16",
    time: "14:00",
  },
];

export const mockAgreements: Agreement[] = [
  {
    id: 1,
    clientId: 1,
    representativeId: 1,
    propertyId: 3,
    price: 980_000,
    date: "2024-05-10",
  },
];