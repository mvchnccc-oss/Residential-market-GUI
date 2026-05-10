"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Representative } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RepresentativesPage() {
  const { representatives, addRepresentative, updateRepresentative, deleteRepresentative } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRep, setEditingRep] = useState<Representative | null>(null);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });

  const filteredRepresentatives = representatives.filter(rep =>
    rep.name.toLowerCase().includes(search.toLowerCase()) ||
    rep.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const repData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      experience: parseInt(formData.experience),
    };

    if (editingRep) {
      updateRepresentative(editingRep.id, repData);
    } else {
      addRepresentative(repData);
    }

    setIsModalOpen(false);
    setEditingRep(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingRep(null);
    setIsModalOpen(true);
  };

  const openEditModal = (rep: Representative) => {
    setFormData({
      name: rep.name,
      email: rep.email,
      phone: rep.phone,
      experience: rep.experience.toString(),
    });
    setEditingRep(rep);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this representative?')) {
      deleteRepresentative(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Representatives</h1>
          <p className="text-muted-foreground">Manage your sales representatives</p>
        </div>
        <Button onClick={openAddModal}>Add Representative</Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search representatives..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Experience (Years)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRepresentatives.map((rep) => (
              <TableRow key={rep.id}>
                <TableCell className="font-medium text-nowrap">{rep.name}</TableCell>
                <TableCell className='text-nowrap'>{rep.email}</TableCell>
                <TableCell className='text-nowrap'>{rep.phone}</TableCell>
                <TableCell>{rep.experience}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(rep)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(rep.id)}>
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
        title={editingRep ? 'Edit Representative' : 'Add Representative'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Experience (Years)"
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingRep ? 'Update' : 'Add'} Representative
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}