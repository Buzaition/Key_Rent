import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { branchRepository } from '@/data/repositories';
import type { Branch } from '@/types';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Branches = () => {
  const { t, i18n } = useTranslation();
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    setBranches(branchRepository.getAll());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('public.ourLocations')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('public.ourLocationsSubtitle')}
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-16 overflow-hidden relative border border-gray-100 dark:border-gray-700 shadow-inner">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" 
            alt="Map" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-full shadow-lg mb-4">
              <MapPin className="w-10 h-10 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-lg backdrop-blur-sm">
              Interactive Map Integration
            </div>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <div 
              key={branch.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute top-0 w-full h-2 ${branch.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'} ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`} />
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-2">
                {branch.name}
              </h3>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p>{branch.address}, {branch.city}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <p dir="ltr" className={i18n.language === 'ar' ? 'text-right' : 'text-left'}>{branch.phone}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <p>{branch.email}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('common.time', 'Hours')}</p>
                    <p className="text-sm">Mon - Sun: 08:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <Button variant="outline" className="w-full gap-2">
                  <MapPin className="w-4 h-4" />
                  {t('public.getDirections')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
