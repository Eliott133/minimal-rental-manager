import React from 'react';
import { Home, Bed, Bath, DollarSign, Wrench, Calendar, Edit, ExternalLink } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
}

export function PropertyCard({ property, onEdit }: PropertyCardProps) {
  const statusColors = {
    Available: 'bg-green-100 text-green-800',
    Rented: 'bg-blue-100 text-blue-800',
    Maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <img
        src={property.image_url}
        alt={property.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[property.status]}`}>
            {property.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <Home className="w-4 h-4" /> 
          <a href={`http://maps.google.com/?q=place_id:${property.address_id}`} className='underline-effect' target='_blank' rel='external'>{property.address}</a>
        </p>
        <div className="flex justify-between items-center text-gray-700 text-sm">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4" /> {property.bathrooms}
            </span>
          </div>
          <span className="flex items-center font-semibold text-gray-900">
            <DollarSign className="w-4 h-4" /> {property.rent.toLocaleString()}€
          </span>
        </div>
        {property.last_payment_date && (
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Dernier paiement : {new Date(property.last_payment_date).toLocaleDateString()}
          </p>
        )}
        { property.maintenance_requests && property.maintenance_requests.length > 0 &&(
          <div className="mt-4 p-3 bg-red-100 text-red-800 text-xs rounded-lg flex items-center gap-2">
            <Wrench className="w-4 h-4" /> {property.maintenance_requests.length} demandes de maintenance en attente
          </div>
        )}
        <button
          onClick={() => onEdit(property)}
          className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition duration-300"
        >
          <Edit className="w-4 h-4" /> Modifier
        </button>
      </div>
    </div>
  );
}