import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * JobSearch Component - Modern search and filter for jobs
 */
export default function JobSearch({
  searchTerm,
  onSearchChange,
  categories = [],
  selectedCategory,
  onCategoryChange,
  locations = [],
  selectedLocation,
  onLocationChange,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Cari posisi, perusahaan, atau skill..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={clsx(
            'w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-200',
            'bg-white text-neutral-900 placeholder-neutral-500',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'shadow-base hover:shadow-md'
          )}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={clsx(
            'flex-1 px-4 py-3 rounded-lg border border-neutral-200',
            'bg-white text-neutral-900',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'shadow-base hover:shadow-md'
          )}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className={clsx(
            'flex-1 px-4 py-3 rounded-lg border border-neutral-200',
            'bg-white text-neutral-900',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'shadow-base hover:shadow-md'
          )}
        >
          {locations.map(loc => (
            <option key={loc.value} value={loc.value}>{loc.label}</option>
          ))}
        </select>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-900 transition-all hover:bg-neutral-50"
      >
        <Filter className="h-5 w-5" />
        Filter
      </button>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="md:hidden space-y-3 bg-white p-4 rounded-lg border border-neutral-200">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-900"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-900"
          >
            {locations.map(loc => (
              <option key={loc.value} value={loc.value}>{loc.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
