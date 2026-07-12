import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Tag, Clock } from 'lucide-react';

export const Offers = () => {
  const { t } = useTranslation();

  const offers = [
    {
      id: 1,
      title: 'Weekend Escape',
      description: 'Get 20% off when you rent any SUV from Thursday to Sunday.',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      badge: 'Limited Time',
      validUntil: '2026-12-31'
    },
    {
      id: 2,
      title: 'Monthly Corporate Rate',
      description: 'Special discounted rates for business rentals exceeding 30 days.',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
      badge: 'B2B Exclusive',
      validUntil: 'Ongoing'
    },
    {
      id: 3,
      title: 'First-time Customer',
      description: 'Enjoy a 10% welcome discount on your first booking with KEY.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
      badge: 'Welcome',
      validUntil: 'Ongoing'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('public.currentOffers')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('public.currentOffersSubtitle')}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  {offer.badge}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-white">
                  {offer.title}
                </h3>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {offer.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  {t('public.validUntil')}: <strong className="ml-1 text-gray-900 dark:text-white">{offer.validUntil}</strong>
                </div>
                
                <Button className="w-full text-lg h-12 gap-2 bg-blue-600 hover:bg-blue-700">
                  <Tag className="w-5 h-5" />
                  {t('public.claimOffer')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
