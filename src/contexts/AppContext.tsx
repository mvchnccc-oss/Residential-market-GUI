"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property, Representative, Client, Tour, Agreement } from '@/lib/types';
import { mockProperties, mockRepresentatives, mockClients, mockTours, mockAgreements } from '@/lib/mockData';

interface AppContextType {
  properties: Property[];
  representatives: Representative[];
  clients: Client[];
  tours: Tour[];
  agreements: Agreement[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: number, property: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
  addRepresentative: (rep: Omit<Representative, 'id'>) => void;
  updateRepresentative: (id: number, rep: Partial<Representative>) => void;
  deleteRepresentative: (id: number) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: number, client: Partial<Client>) => void;
  deleteClient: (id: number) => void;
  addTour: (tour: Omit<Tour, 'id'>) => void;
  updateTour: (id: number, tour: Partial<Tour>) => void;
  deleteTour: (id: number) => void;
  addAgreement: (agreement: Omit<Agreement, 'id'>) => void;
  updateAgreement: (id: number, agreement: Partial<Agreement>) => void;
  deleteAgreement: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [representatives, setRepresentatives] = useState<Representative[]>(mockRepresentatives);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [agreements, setAgreements] = useState<Agreement[]>(mockAgreements);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newId = Math.max(...properties.map(p => p.id)) + 1;
    setProperties([...properties, { ...property, id: newId }]);
  };

  const updateProperty = (id: number, updates: Partial<Property>) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const addRepresentative = (rep: Omit<Representative, 'id'>) => {
    const newId = Math.max(...representatives.map(r => r.id)) + 1;
    setRepresentatives([...representatives, { ...rep, id: newId }]);
  };

  const updateRepresentative = (id: number, updates: Partial<Representative>) => {
    setRepresentatives(representatives.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRepresentative = (id: number) => {
    setRepresentatives(representatives.filter(r => r.id !== id));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newId = Math.max(...clients.map(c => c.id)) + 1;
    setClients([...clients, { ...client, id: newId }]);
  };

  const updateClient = (id: number, updates: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addTour = (tour: Omit<Tour, 'id'>) => {
    const newId = Math.max(...tours.map(t => t.id)) + 1;
    setTours([...tours, { ...tour, id: newId }]);
  };

  const updateTour = (id: number, updates: Partial<Tour>) => {
    setTours(tours.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTour = (id: number) => {
    setTours(tours.filter(t => t.id !== id));
  };

  const addAgreement = (agreement: Omit<Agreement, 'id'>) => {
    const newId = Math.max(...agreements.map(a => a.id)) + 1;
    setAgreements([...agreements, { ...agreement, id: newId }]);
  };

  const updateAgreement = (id: number, updates: Partial<Agreement>) => {
    setAgreements(agreements.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAgreement = (id: number) => {
    setAgreements(agreements.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider value={{
      properties,
      representatives,
      clients,
      tours,
      agreements,
      addProperty,
      updateProperty,
      deleteProperty,
      addRepresentative,
      updateRepresentative,
      deleteRepresentative,
      addClient,
      updateClient,
      deleteClient,
      addTour,
      updateTour,
      deleteTour,
      addAgreement,
      updateAgreement,
      deleteAgreement,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}