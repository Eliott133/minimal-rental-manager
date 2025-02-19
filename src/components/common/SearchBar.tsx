import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ searchTerm, onSearchChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      <input
        type="text"
        className="w-full pl-10 p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
