"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/contexts/ToastContext';
import { Property, PropertyType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function PropertiesPage() {
  const { properties, representatives, addProperty, updateProperty, deleteProperty } = useApp();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PropertyType | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Sold' | 'Pending'>('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'Apartment' as PropertyType,
    beds: '',
    baths: '',
    sqft: '',
    status: 'Available' as 'Available' | 'Sold' | 'Pending',
    representativeId: '',
    img: '',
  });

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                         p.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesMinPrice = !minPrice || p.price >= parseInt(minPrice);
    const matchesMaxPrice = !maxPrice || p.price <= parseInt(maxPrice);
    return matchesSearch && matchesType && matchesStatus && matchesMinPrice && matchesMaxPrice;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const propertyData = {
      title: formData.title,
      location: formData.location,
      price: parseInt(formData.price),
      type: formData.type,
      beds: parseInt(formData.beds),
      baths: parseInt(formData.baths),
      sqft: parseInt(formData.sqft),
      status: formData.status,
      representativeId: formData.representativeId ? parseInt(formData.representativeId) : undefined,
      img: formData.img || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80',
    };

    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
      addToast('Property updated successfully!', 'success');
    } else {
      addProperty(propertyData);
      addToast('Property added successfully!', 'success');
    }

    setIsModalOpen(false);
    setEditingProperty(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      type: 'Apartment',
      beds: '',
      baths: '',
      sqft: '',
      status: 'Available',
      representativeId: '',
      img: '',
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      type: property.type,
      beds: property.beds.toString(),
      baths: property.baths.toString(),
      sqft: property.sqft.toString(),
      status: property.status,
      representativeId: property.representativeId?.toString() || '',
      img: property.img,
    });
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
      addToast('Property deleted successfully!', 'success');
    }
  };

  const getRepresentativeName = (id?: number) => {
    if (!id) return 'Unassigned';
    const rep = representatives.find(r => r.id === id);
    return rep?.name || 'Unknown';
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button onClick={openAddModal}>Add Property</Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as PropertyType | 'All')}
          options={[
            { value: 'All', label: 'All Types' },
            { value: 'Villa', label: 'Villa' },
            { value: 'Apartment', label: 'Apartment' },
            { value: 'Townhouse', label: 'Townhouse' },
            { value: 'Studio', label: 'Studio' },
          ]}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Available' | 'Sold' | 'Pending')}
          options={[
            { value: 'All', label: 'All Status' },
            { value: 'Available', label: 'Available' },
            { value: 'Sold', label: 'Sold' },
            { value: 'Pending', label: 'Pending' },
          ]}
        />
        <Input
          placeholder="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearch('');
            setTypeFilter('All');
            setStatusFilter('All');
            setMinPrice('');
            setMaxPrice('');
          }}
        >
          Clear
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Representative</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium text-nowrap">{property.title}</TableCell>
                <TableCell className='text-nowrap'>{property.location}</TableCell>
                <TableCell className='text-nowrap'>{property.type}</TableCell>
                <TableCell className='text-nowrap'>EGP {property.price.toLocaleString()}</TableCell>
                <TableCell className='text-nowrap'>
                  <Badge variant={
                    property.status === 'Available' ? 'default' :
                    property.status === 'Sold' ? 'secondary' : 'danger'
                  }>
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell>{getRepresentativeName(property.representativeId)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(property)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(property.id)}>
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
        title={editingProperty ? 'Edit Property' : 'Add Property'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <Select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
            options={[
              { value: 'Villa', label: 'Villa' },
              { value: 'Apartment', label: 'Apartment' },
              { value: 'Townhouse', label: 'Townhouse' },
              { value: 'Studio', label: 'Studio' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Beds"
              type="number"
              value={formData.beds}
              onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
              required
            />
            <Input
              label="Baths"
              type="number"
              value={formData.baths}
              onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
              required
            />
          </div>
          <Input
            label="Square Feet"
            type="number"
            value={formData.sqft}
            onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Available' | 'Sold' | 'Pending' })}
            options={[
              { value: 'Available', label: 'Available' },
              { value: 'Sold', label: 'Sold' },
              { value: 'Pending', label: 'Pending' },
            ]}
          />
          <Select
            label="Representative"
            value={formData.representativeId}
            onChange={(e) => setFormData({ ...formData, representativeId: e.target.value })}
            options={[
              { value: '', label: 'Unassigned' },
              ...representatives.map(rep => ({ value: rep.id.toString(), label: rep.name })),
            ]}
          />
          <Input
            label="Image URL"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            placeholder="https://..."
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingProperty ? 'Update' : 'Add'} Property
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}