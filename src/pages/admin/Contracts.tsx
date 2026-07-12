import React, { useState, useEffect } from 'react';
import type { Contract, Customer, Vehicle } from '@/types';
import { contractRepository, customerRepository, vehicleRepository } from '@/data/repositories';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Search, FileText, Download, CheckCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';

export const Contracts = () => {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerId: '',
    vehicleId: '',
    startDate: '',
    expectedReturnDate: '',
    startMileage: 0,
    dailyRate: 1000
  });

  const loadData = () => {
    setContracts(contractRepository.getAll());
    setCustomers(customerRepository.getAll());
    setVehicles(vehicleRepository.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCustomer = (id: string) => customers.find(c => c.id === id);
  const getVehicle = (id: string) => vehicles.find(v => v.id === id);

  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerId || !formData.vehicleId || !formData.startDate || !formData.expectedReturnDate) return;

    const newContract: Contract = {
      id: `con${Date.now()}`,
      contractNumber: `CN-${Math.floor(Math.random() * 90000)}`,
      reservationId: undefined,
      customerId: formData.customerId,
      vehicleId: formData.vehicleId,
      pickupBranchId: 'b1',
      returnBranchId: 'b1',
      startDate: new Date(formData.startDate).toISOString(),
      expectedReturnDate: new Date(formData.expectedReturnDate).toISOString(),
      actualReturnDate: undefined,
      startMileage: formData.startMileage,
      endMileage: undefined,
      fuelLevelStart: 100,
      fuelLevelEnd: undefined,
      dailyRate: formData.dailyRate,
      includedKilometers: 200,
      extraKilometerRate: 5,
      securityDeposit: 3000,
      discount: 0,
      tax: formData.dailyRate * 3 * 0.15,
      additionalServicesTotal: 0,
      totalAmount: formData.dailyRate * 3, // Mock calculation
      paidAmount: 0,
      remainingAmount: formData.dailyRate * 3,
      status: 'Active',
      assignedEmployeeId: '1',
      termsAccepted: true,
      notes: ''
    };
    
    contractRepository.create(newContract);
    loadData();
    setIsAddModalOpen(false);
  };

  const filteredContracts = contracts.filter(c => {
    const cust = getCustomer(c.customerId);
    return cust && cust.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('nav.contracts', 'Rental Contracts')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('contracts.subtitle', 'Manage active rentals, handovers, and returns')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <FileText className="mr-2 h-4 w-4" /> {t('contracts.createContract', 'Create Contract')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contracts.activeContracts', 'Active Contracts')}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {contracts.filter(c => c.status === 'Active').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contracts.overdueReturns', 'Overdue Returns')}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {contracts.filter(c => c.status === 'Overdue').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-600 dark:text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contracts.totalValue', 'Total Value (Active)')}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {t('common.egp', 'EGP')} {contracts.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.totalAmount, 0).toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2">
              <Button variant="outline" className="bg-gray-100 dark:bg-gray-800">{t('common.all', 'All')}</Button>
              <Button variant="ghost">{t('common.status.active', 'Active')}</Button>
              <Button variant="ghost">{t('contracts.overdue', 'Overdue')}</Button>
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
                <TableHead className="pl-6">{t('contracts.id', 'Contract ID')}</TableHead>
                <TableHead>{t('common.customer', 'Customer')}</TableHead>
                <TableHead>{t('common.vehicle', 'Vehicle')}</TableHead>
                <TableHead>{t('contracts.expectedReturn', 'Expected Return')}</TableHead>
                <TableHead>{t('contracts.mileageLimits', 'Mileage Limits')}</TableHead>
                <TableHead>{t('common.status', 'Status')}</TableHead>
                <TableHead className="text-right pr-6">{t('common.actions', 'Action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => {
                const customer = getCustomer(contract.customerId);
                const vehicle = getVehicle(contract.vehicleId);
                
                return (
                  <TableRow key={contract.id}>
                    <TableCell className="pl-6 font-medium text-gray-900 dark:text-white">
                      {contract.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-white">{customer?.fullName}</div>
                      <div className="text-xs text-gray-500">{customer?.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{vehicle?.brand} {vehicle?.model}</div>
                      <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded w-fit mt-1">
                        {vehicle?.plateNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(contract.expectedReturnDate).toLocaleDateString()}
                      </div>
                      {contract.status === 'Overdue' && (
                        <div className="text-xs text-red-500 mt-1">{t('contracts.pastDueDate', 'Past due date!')}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{contract.includedKilometers} km</div>
                      <div className="text-xs text-gray-500">
                        {contract.startMileage.toLocaleString()} km ({t('contracts.out', 'Out')})
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {t(`common.status.${contract.status.toLowerCase()}`, contract.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {contract.status === 'Active' || contract.status === 'Overdue' ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                            {t('contracts.return', 'Return')}
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          {t('common.view', 'View')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredContracts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    {t('contracts.noContracts', 'No contracts found.')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Contract Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('contracts.createContract', 'Create Contract')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleAddContract}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-contract-form" onSubmit={handleAddContract} className="space-y-4">
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
              <label className="text-sm font-medium">{t('common.vehicle', 'Vehicle')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.vehicleId}
                onChange={e => setFormData({...formData, vehicleId: e.target.value})}
                required
              >
                <option value="" disabled>{t('contracts.selectVehicle', 'Select Vehicle')}</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.brand} {v.model} - {v.plateNumber}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('contracts.startDate', 'Start Date')}</label>
              <Input 
                required 
                type="date"
                value={formData.startDate} 
                onChange={e => setFormData({...formData, startDate: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('contracts.expectedReturnDate', 'Expected Return Date')}</label>
              <Input 
                required 
                type="date"
                value={formData.expectedReturnDate} 
                onChange={e => setFormData({...formData, expectedReturnDate: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('contracts.startMileage', 'Start Mileage (km)')}</label>
              <Input 
                required 
                type="number"
                value={formData.startMileage} 
                onChange={e => setFormData({...formData, startMileage: Number(e.target.value)})} 
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
          </div>
        </form>
      </Modal>
    </div>
  );
};
