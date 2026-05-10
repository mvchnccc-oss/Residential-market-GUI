"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Agreement } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AgreementsPage() {
  const { agreements, clients, properties, representatives, addAgreement, updateAgreement, deleteAgreement } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | null>(null);

  const [formData, setFormData] = useState({
    clientId: '',
    propertyId: '',
    representativeId: '',
    price: '',
    date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const agreementData = {
      clientId: parseInt(formData.clientId),
      propertyId: parseInt(formData.propertyId),
      representativeId: parseInt(formData.representativeId),
      price: parseInt(formData.price),
      date: formData.date,
    };

    if (editingAgreement) {
      updateAgreement(editingAgreement.id, agreementData);
    } else {
      addAgreement(agreementData);
    }

    setIsModalOpen(false);
    setEditingAgreement(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      clientId: '',
      propertyId: '',
      representativeId: '',
      price: '',
      date: '',
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingAgreement(null);
    setIsModalOpen(true);
  };

  const openEditModal = (agreement: Agreement) => {
    setFormData({
      clientId: agreement.clientId.toString(),
      propertyId: agreement.propertyId.toString(),
      representativeId: agreement.representativeId.toString(),
      price: agreement.price.toString(),
      date: agreement.date,
    });
    setEditingAgreement(agreement);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this agreement?')) {
      deleteAgreement(id);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agreements</h1>
          <p className="text-muted-foreground">Manage finalized property deals</p>
        </div>
        <Button onClick={openAddModal}>Add Agreement</Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Representative</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agreements.map((agreement) => (
              <TableRow key={agreement.id}>
                <TableCell className="font-medium">{getClientName(agreement.clientId)}</TableCell>
                <TableCell>{getPropertyTitle(agreement.propertyId)}</TableCell>
                <TableCell>{getRepresentativeName(agreement.representativeId)}</TableCell>
                <TableCell>EGP {agreement.price.toLocaleString()}</TableCell>
                <TableCell>{new Date(agreement.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(agreement)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(agreement.id)}>
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
        title={editingAgreement ? 'Edit Agreement' : 'Add Agreement'}
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
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingAgreement ? 'Update' : 'Add'} Agreement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}