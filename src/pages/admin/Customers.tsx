import React, { useState, useEffect } from 'react';
import type { Customer } from '@/types';
import { customerRepository } from '@/data/repositories';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Plus, Search, Filter, MoreHorizontal, User, ShieldAlert } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useTranslation } from 'react-i18next';

export const Customers = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    nationalIdOrPassport: '',
    customerType: 'Individual' as Customer['customerType'],
  });

  const loadCustomers = () => {
    setCustomers(customerRepository.getAll());
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      nationalIdOrPassport: formData.nationalIdOrPassport,
      customerType: formData.customerType,
      nationality: 'Egypt',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      address: '',
      city: 'Cairo',
      drivingLicenseNumber: `DL${Math.floor(Math.random() * 90000)}`,
      licenseIssueDate: '2020-01-01',
      licenseExpiryDate: '2030-01-01',
      licenseCountry: 'Egypt',
      blacklistStatus: false,
      riskLevel: 'Low',
      outstandingBalance: 0,
      totalRentals: 0,
      totalSpending: 0,
      notes: '',
      createdAt: new Date().toISOString()
    };
    
    customerRepository.create(newCustomer);
    loadCustomers();
    setIsAddModalOpen(false);
    setFormData({ fullName: '', phone: '', email: '', nationalIdOrPassport: '', customerType: 'Individual' });
  };

  const filteredCustomers = customers.filter(c => 
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm) || 
    c.nationalIdOrPassport.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t('customers.title', 'Customers')}</h1>
        <Button className="w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t('customers.addCustomer', 'Add Customer')}
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                placeholder={t('customers.searchPlaceholder', 'Search customers by name, phone, or ID...')} 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> {t('common.filter', 'Filter')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('common.customer', 'Customer')}</TableHead>
                <TableHead>{t('common.contact', 'Contact')}</TableHead>
                <TableHead>{t('common.type', 'Type')}</TableHead>
                <TableHead>{t('customers.totalRentals', 'Total Rentals')}</TableHead>
                <TableHead>{t('customers.riskLevel', 'Risk Level')}</TableHead>
                <TableHead className="text-right">{t('common.actions', 'Actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{customer.fullName}</p>
                          <p className="text-sm text-gray-500">{customer.nationalIdOrPassport}</p>
                        </div>
                        {customer.blacklistStatus && (
                          <ShieldAlert className="w-4 h-4 text-red-500 ml-2" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{customer.phone}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        customer.customerType === 'Corporate' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        customer.customerType === 'VIP' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {customer.customerType}
                      </span>
                    </TableCell>
                    <TableCell>{customer.totalRentals}</TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        customer.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                        customer.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {customer.riskLevel}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    {t('customers.noCustomers', 'No customers found.')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('customers.addCustomer', 'Add Customer')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleAddCustomer}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-customer-form" onSubmit={handleAddCustomer} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('customers.fullName', 'Full Name')}</label>
              <Input 
                required 
                value={formData.fullName} 
                onChange={e => setFormData({...formData, fullName: e.target.value})} 
                placeholder="John Doe" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('customers.nationalId', 'National ID / Passport')}</label>
              <Input 
                required 
                value={formData.nationalIdOrPassport} 
                onChange={e => setFormData({...formData, nationalIdOrPassport: e.target.value})} 
                placeholder="29001010101010" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.phone', 'Phone Number')}</label>
              <Input 
                required 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                placeholder="+20 10..." 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.email', 'Email Address')}</label>
              <Input 
                required 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                placeholder="john@example.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.type', 'Customer Type')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.customerType}
                onChange={e => setFormData({...formData, customerType: e.target.value as any})}
              >
                <option value="Individual">Individual</option>
                <option value="Corporate">Corporate</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
