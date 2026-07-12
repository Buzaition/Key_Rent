import React, { useState, useEffect } from 'react';
import type { Vehicle } from '@/types';
import { vehicleRepository } from '@/data/repositories';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, Plus, LayoutGrid, List as ListIcon, Car, Wrench, Settings, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';

export const Vehicles = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Sedan' as Vehicle['category'],
    plateNumber: '',
    dailyRate: 1000,
    status: 'Available' as Vehicle['status']
  });

  const loadVehicles = () => {
    setVehicles(vehicleRepository.getAll());
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle: Vehicle = {
      id: `v${Date.now()}`,
      fleetNumber: `FLT-${Math.floor(Math.random() * 9000)}`,
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      category: formData.category,
      plateNumber: formData.plateNumber,
      dailyRate: formData.dailyRate,
      weeklyRate: formData.dailyRate * 6,
      monthlyRate: formData.dailyRate * 22,
      status: formData.status,
      
      // Defaults
      vin: `WAUZZZ${Math.floor(Math.random() * 900000000)}`,
      color: 'White',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: formData.category === 'SUV' ? 7 : 5,
      engineSize: '1.6L',
      currentMileage: 0,
      branchId: 'b1',
      securityDeposit: 3000,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseCost: 1000000,
      currentValue: 1000000,
      registrationNumber: `REG-${Math.floor(Math.random() * 90000)}`,
      registrationExpiry: '2030-01-01',
      insuranceProvider: 'Misr Insurance',
      insurancePolicyNumber: 'POL-123',
      insuranceExpiry: '2030-01-01',
      lastServiceMileage: 0,
      nextServiceMileage: 10000,
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDate: '2025-01-01',
      ownershipType: 'Owned',
      notes: '',
      images: []
    };
    
    vehicleRepository.create(newVehicle);
    loadVehicles();
    setIsAddModalOpen(false);
  };

  const filteredVehicles = vehicles.filter(v => 
    (filterStatus === 'All' || v.status === filterStatus) &&
    (v.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
     v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
     v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Rented': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Maintenance': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Out of Service': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t('nav.fleet', 'Fleet Management')}</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t('vehicles.addVehicle', 'Add Vehicle')}
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              placeholder={t('vehicles.searchPlaceholder', 'Search make, model, or plate...')} 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">{t('vehicles.allStatuses', 'All Statuses')}</option>
            <option value="Available">{t('common.status.available', 'Available')}</option>
            <option value="Rented">{t('common.status.rented', 'Rented')}</option>
            <option value="Maintenance">{t('common.status.maintenance', 'Maintenance')}</option>
          </select>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : ''}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700' : ''}>
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map(vehicle => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Car className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(vehicle.status)}`}>
                    {t(`common.status.${vehicle.status.toLowerCase().replace(' ', '')}`, vehicle.status)}
                  </span>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.category}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <div className="w-full flex justify-between font-medium font-mono text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                    <span>{vehicle.plateNumber}</span>
                    <span>{vehicle.currentMileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-1 w-[45%]">
                    <Settings className="w-3 h-3" /> {vehicle.transmission}
                  </div>
                  <div className="flex items-center gap-1 w-[45%]">
                    <Droplets className="w-3 h-3" /> {vehicle.fuelType}
                  </div>
                  <div className="flex items-center gap-1 w-full mt-1 text-red-500">
                    <Wrench className="w-3 h-3" /> {t('vehicles.nextService', 'Next Service')}: {vehicle.nextServiceMileage.toLocaleString()} km
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {t('common.egp', 'EGP')} {vehicle.dailyRate} <span className="text-sm font-normal text-gray-500">/{t('home.day', 'day')}</span>
                  </span>
                  <Button variant="outline" size="sm">{t('common.details', 'Details')}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8 text-center text-gray-500">
            {t('vehicles.listViewSelected', 'List view selected. (Switch to Grid for visual cards)')}
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('vehicles.addVehicle', 'Add Vehicle')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleAddVehicle}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-vehicle-form" onSubmit={handleAddVehicle} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('vehicles.brand', 'Brand')}</label>
              <Input 
                required 
                value={formData.brand} 
                onChange={e => setFormData({...formData, brand: e.target.value})} 
                placeholder="Toyota" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('vehicles.model', 'Model')}</label>
              <Input 
                required 
                value={formData.model} 
                onChange={e => setFormData({...formData, model: e.target.value})} 
                placeholder="Camry" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('vehicles.plateNumber', 'Plate Number')}</label>
              <Input 
                required 
                value={formData.plateNumber} 
                onChange={e => setFormData({...formData, plateNumber: e.target.value})} 
                placeholder="أ ب ج 123" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('vehicles.dailyRate', 'Daily Rate (EGP)')}</label>
              <Input 
                required 
                type="number"
                value={formData.dailyRate} 
                onChange={e => setFormData({...formData, dailyRate: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.type', 'Category')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                <option value="Economy">Economy</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.status', 'Status')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
