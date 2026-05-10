"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/contexts/ToastContext';
import { Tour } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ToursPage() {
  const { tours, clients, properties, representatives, addTour, updateTour, deleteTour, addAgreement } = useApp();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  const [formData, setFormData] = useState({
    clientId: '',
    propertyId: '',
    representativeId: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tourData = {
      clientId: parseInt(formData.clientId),
      propertyId: parseInt(formData.propertyId),
      representativeId: parseInt(formData.representativeId),
      date: formData.date,
      time: formData.time,
    };

    if (editingTour) {
      updateTour(editingTour.id, tourData);
    } else {
      addTour(tourData);
    }

    setIsModalOpen(false);
    setEditingTour(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      clientId: '',
      propertyId: '',
      representativeId: '',
      date: '',
      time: '',
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingTour(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tour: Tour) => {
    setFormData({
      clientId: tour.clientId.toString(),
      propertyId: tour.propertyId.toString(),
      representativeId: tour.representativeId.toString(),
      date: tour.date,
      time: tour.time,
    });
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      deleteTour(id);
    }
  };

  const getClientName = (id: number) => {
    const client = clients.find(c => c.id === id);
    return client?.name || 'Unknown';
  };

  const getPropertyTitle = (id: number) => {
    const property = properties.find(p => p.id === id);
    return property?.title || 'Unknown';
  };

  const getRepresentativeName = (id: number) => {
    const rep = representatives.find(r => r.id === id);
    return rep?.name || 'Unknown';
  };

  const handleFinalizeDeal = (tour: Tour) => {
    const property = properties.find(p => p.id === tour.propertyId);
    if (!property) return;

    if (confirm(`Finalize deal for ${property.title} at EGP ${property.price.toLocaleString()}?`)) {
      addAgreement({
        clientId: tour.clientId,
        propertyId: tour.propertyId,
        representativeId: tour.representativeId,
        price: property.price,
        date: new Date().toISOString().split('T')[0],
      });
      addToast('Deal finalized successfully!', 'success');
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tours</h1>
          <p className="text-muted-foreground">Schedule and manage property tours</p>
        </div>
        <Button onClick={openAddModal}>Schedule Tour</Button>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Representative</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium text-nowrap">{getClientName(tour.clientId)}</TableCell>
                <TableCell className='text-nowrap'>{getPropertyTitle(tour.propertyId)}</TableCell>
                <TableCell className='text-nowrap'>{getRepresentativeName(tour.representativeId)}</TableCell>
                <TableCell className='text-nowrap'>{new Date(tour.date).toLocaleDateString()}</TableCell>
                <TableCell className='text-nowrap'>{tour.time}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" onClick={() => handleFinalizeDeal(tour)}>
                      Finalize Deal
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openEditModal(tour)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(tour.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTour ? 'Edit Tour' : 'Schedule Tour'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Client"
            value={formData.clientId}
            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            options={clients.map(client => ({ value: client.id.toString(), label: client.name }))}
            required
          />
          <Select
            label="Property"
            value={formData.propertyId}
            onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
            options={properties.map(property => ({ value: property.id.toString(), label: property.title }))}
            required
          />
          <Select
            label="Representative"
            value={formData.representativeId}
            onChange={(e) => setFormData({ ...formData, representativeId: e.target.value })}
            options={representatives.map(rep => ({ value: rep.id.toString(), label: rep.name }))}
            required
          />
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTour ? 'Update' : 'Schedule'} Tour
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}