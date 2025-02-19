import React, { useState, useEffect } from 'react';
import { Building2, Search, SlidersHorizontal, PlusCircle } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyEditModal } from '../components/PropertyEditModal';
import { SearchBar } from '../components/common/SearchBar';
import { Property } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          maintenance_requests (
            id,
            description,
            status,
            priority,
            created_at,
            updated_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleSaveProperty = async (updatedProperty: Property) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('No authenticated user');

      const propertyData = {
        ...updatedProperty,
        user_id: userData.user.id,
        updated_at: new Date().toISOString()
      };

      // Remove any fields not in the database schema
      delete (propertyData as any).maintenance_requests;

      const { error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', updatedProperty.id);

      if (error) throw error;

      toast.success('Property updated successfully');
      fetchProperties();
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    }
  };

  const handleAddProperty = async () => {
    const newProperty = {
      name: 'New Property',
      address: '',
      address_id: '',
      type: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      rent: 0,
      status: 'Available',
      image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800',
      last_payment_date: null
    };

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('properties')
        .insert([{ ...newProperty, user_id: userData.user.id }])
        .select('*').single();

      if (error) throw error;
      toast.success('Property created successfully');
      setSelectedProperty(data);
      fetchProperties();
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Failed to create property');
    }
  };

  return (
    <div className="p-6 grid gap-6 bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-xl shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-600">Manage and track your rental properties easily.</p>
        </div>
        <button 
          onClick={handleAddProperty} 
          className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
          <PlusCircle className="w-5 h-5" /> Add Property
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search properties..." />
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          <select
            className="border p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onEdit={handleEditProperty} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No properties found.</p>
          )}
        </div>
      )}

      {selectedProperty && (
        <PropertyEditModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
}