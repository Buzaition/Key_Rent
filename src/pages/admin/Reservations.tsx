import React, { useState, useEffect } from 'react';
import type { Reservation, Customer, Vehicle } from '@/types';
import { reservationRepository, customerRepository, vehicleRepository } from '@/data/repositories';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Calendar, Plus, Search, MapPin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';

export const Reservations = () => {
  const { t } = useTranslation();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerId: '',
    vehicleCategoryId: 'Sedan',
    pickupDate: '',
    returnDate: '',
    status: 'Confirmed' as Reservation['status']
  });

  const loadData = () => {
    setReservations(reservationRepository.getAll());
    setCustomers(customerRepository.getAll());
    setVehicles(vehicleRepository.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCustomer = (id: string) => customers.find(c => c.id === id);
  const getVehicle = (id: string) => vehicles.find(v => v.id === id);

  const handleAddReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerId || !formData.pickupDate || !formData.returnDate) return;

    const newReservation: Reservation = {
      id: `res${Date.now()}`,
      reservationNumber: `RES-${Math.floor(Math.random() * 90000)}`,
      customerId: formData.customerId,
      vehicleCategory: formData.vehicleCategoryId as any,
      assignedVehicleId: undefined, // Assign later
      pickupDate: new Date(formData.pickupDate).toISOString(),
      returnDate: new Date(formData.returnDate).toISOString(),
      pickupBranchId: 'b1',
      returnBranchId: 'b1',
      branchId: 'b1',
      dailyPrice: 100,
      numberOfDays: 3,
      additionalServices: [],
      discount: 0,
      taxes: 45,
      securityDeposit: 3000,
      paymentStatus: 'Pending',
      assignedEmployeeId: '1',
      source: 'Website',
      status: formData.status,
      estimatedTotal: 3000,
      createdAt: new Date().toISOString(),
      notes: ''
    };
    
    reservationRepository.create(newReservation);
    loadData();
    setIsAddModalOpen(false);
  };

  const filteredReservations = reservations.filter(r => {
    const c = getCustomer(r.customerId);
    const matchesId = r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesName = c && c.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesId || matchesName;
  });

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Vehicle Assigned': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('nav.reservations', 'Reservations')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('reservations.subtitle', 'Manage upcoming bookings and availability')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t('reservations.newReservation', 'New Reservation')}
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2">
              <Button variant="outline" className="bg-gray-100 dark:bg-gray-800">{t('reservations.upcoming', 'Upcoming')}</Button>
              <Button variant="ghost">{t('reservations.past', 'Past')}</Button>
              <Button variant="ghost">{t('reservations.cancelled', 'Cancelled')}</Button>
            </div>
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                placeholder={t('reservations.searchPlaceholder', 'Search by customer name...')} 
                className="pl-10 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">{t('reservations.id', 'Reservation ID')}</TableHead>
                <TableHead>{t('common.customer', 'Customer')}</TableHead>
                <TableHead>{t('common.vehicle', 'Vehicle')}</TableHead>
                <TableHead>{t('reservations.schedule', 'Schedule')}</TableHead>
                <TableHead>{t('reservations.totalAmount', 'Total Amount')}</TableHead>
                <TableHead>{t('common.status', 'Status')}</TableHead>
                <TableHead className="text-right pr-6">{t('common.actions', 'Action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => {
                const customer = getCustomer(reservation.customerId);
                const vehicle = reservation.assignedVehicleId ? getVehicle(reservation.assignedVehicleId) : null;
                
                return (
                  <TableRow key={reservation.id}>
                    <TableCell className="pl-6 font-medium text-gray-900 dark:text-white">
                      #{reservation.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-white">{customer?.fullName}</div>
                      <div className="text-xs text-gray-500">{customer?.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{vehicle ? `${vehicle.brand} ${vehicle.model}` : t('reservations.notAssigned', 'Not assigned')}</div>
                      {vehicle && <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded w-fit mt-1">
                        {vehicle.plateNumber}
                      </div>}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>{new Date(reservation.pickupDate).toLocaleDateString()}</span>
                          <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
                          <span>{new Date(reservation.returnDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{t('reservations.branch1', 'Branch 1')}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{t('common.egp', 'EGP')} {reservation.estimatedTotal.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                        {t(`common.status.${reservation.status.toLowerCase().replace(' ', '')}`, reservation.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {reservation.status === 'Confirmed' ? (
                        <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
                          {t('reservations.startRental', 'Start Rental')}
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          {t('common.view', 'View')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    {t('reservations.noReservations', 'No reservations found.')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Reservation Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('reservations.newReservation', 'New Reservation')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleAddReservation}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-reservation-form" onSubmit={handleAddReservation} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.customer', 'Customer')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.customerId}
                onChange={e => setFormData({...formData, customerId: e.target.value})}
                required
              >
                <option value="" disabled>{t('reservations.selectCustomer', 'Select Customer')}</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.type', 'Vehicle Category')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.vehicleCategoryId}
                onChange={e => setFormData({...formData, vehicleCategoryId: e.target.value})}
              >
                <option value="Economy">{t('categories.economy', 'Economy')}</option>
                <option value="Sedan">{t('categories.sedan', 'Sedan')}</option>
                <option value="SUV">{t('categories.suv', 'SUV')}</option>
                <option value="Luxury">{t('categories.luxury', 'Luxury')}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('home.pickupDate', 'Pick-up Date')}</label>
              <Input 
                required 
                type="date"
                value={formData.pickupDate} 
                onChange={e => setFormData({...formData, pickupDate: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('home.returnDate', 'Return Date')}</label>
              <Input 
                required 
                type="date"
                value={formData.returnDate} 
                onChange={e => setFormData({...formData, returnDate: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.status', 'Status')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Confirmed">{t('common.status.confirmed', 'Confirmed')}</option>
                <option value="Vehicle Assigned">{t('common.status.vehicleassigned', 'Vehicle Assigned')}</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
