import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { vehicleRepository } from '@/data/repositories';
import type { Vehicle } from '@/types';
import { Button } from '@/components/ui/Button';
import { CarFront, Filter } from 'lucide-react';

export const Vehicles = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // We only want available vehicles for public viewing in a real scenario,
    // but for demo purposes, we can show the whole fleet or filter by Active/Available.
    const allVehicles = vehicleRepository.getAll().filter(v => v.status === 'Available');
    setVehicles(allVehicles);
  }, []);

  const categories = ['all', 'Economy', 'Sedan', 'SUV', 'Luxury'];

  const filteredVehicles = activeCategory === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('public.ourFleet')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('public.ourFleetSubtitle')}
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                activeCategory === cat 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? t('public.allCategories') : t(`categories.${cat.toLowerCase()}`, cat)}
            </Button>
          ))}
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVehicles.map((v) => (
              <div 
                key={v.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img 
                    src={v.images[0] || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'} 
                    alt={`${v.brand} ${v.model}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 shadow-sm">
                    {t(`categories.${v.category.toLowerCase()}`, v.category)}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {v.brand} {v.model}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
                    <CarFront className="w-4 h-4" />
                    {v.year} • {v.fuelType}
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{t('vehicles.dailyRate', 'Daily Rate')}</div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {v.dailyRate} <span className="text-sm font-normal text-gray-500">{t('common.egp')}</span>
                      </div>
                    </div>
                    <Button className="rounded-full px-6">{t('home.bookNow')}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No vehicles found</h3>
            <p className="text-gray-500 mt-2">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
