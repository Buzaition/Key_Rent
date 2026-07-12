import React from 'react';

import { Button } from '@/components/ui/Button';
import { CarFront, MapPin, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useTranslation } from 'react-i18next';
import nissanSunnyImg from '@/assets/vehicles/nissan_sunny.jpg';
import toyotaCamryImg from '@/assets/vehicles/toyota_camry.jpg';
import kiaSportageImg from '@/assets/vehicles/kia_sportage.jpg';

export const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              {t('home.heroTitle1', 'Drive More.')}<br />
              <span className="text-blue-500">{t('home.heroTitle2', 'Manage Smarter.')}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl">
              {t('home.heroSubtitle', 'Book reliable vehicles, manage your rental, and enjoy a smooth experience from reservation to return.')}
            </p>
          </div>

          {/* Search Form Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-4xl relative z-10 text-gray-900 dark:text-white">
            <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium mb-1">{t('home.pickupLocation', 'Pick-up Location')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input placeholder={t('home.selectBranch', 'Select Branch')} className="pl-10" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-medium mb-1">{t('home.pickupDate', 'Pick-up Date')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-medium mb-1">{t('home.returnDate', 'Return Date')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 flex items-end">
                <Button className="w-full h-10" size="lg">
                  <Search className="mr-2 h-4 w-4" /> {t('home.search', 'Search')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('home.ourFleet', 'Our Fleet')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('home.fleetSubtitle', 'Choose from our wide range of meticulously maintained vehicles for your next journey.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { cat: 'Economy', name: 'Nissan Sunny', price: 120, img: nissanSunnyImg },
              { cat: 'Sedan', name: 'Toyota Camry', price: 150, img: toyotaCamryImg },
              { cat: 'SUV', name: 'Kia Sportage', price: 450, img: kiaSportageImg }
            ].map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">{v.cat}</div>
                  <h3 className="text-xl font-bold mb-4">{v.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">{t('common.egp', 'EGP')} {v.price}</span>
                      <span className="text-gray-500 text-sm"> / {t('home.day', 'day')}</span>
                    </div>
                    <Button variant="outline">{t('home.bookNow', 'Book Now')}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">{t('home.howItWorks', 'How It Works')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.step1', '1. Choose a vehicle')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.step1Desc', 'Search our fleet and find the perfect car for your needs and budget.')}</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.step2', '2. Pick dates & location')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.step2Desc', 'Select your pick-up and return dates along with convenient branches.')}</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                <CarFront className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.step3', '3. Book & Drive')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.step3Desc', 'Confirm your reservation online and pick up your keys in minutes.')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
