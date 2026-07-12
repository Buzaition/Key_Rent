import React, { useState, useEffect } from 'react';
import type { Payment, Customer, Contract } from '@/types';
import { paymentRepository, customerRepository, contractRepository } from '@/data/repositories';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Search, DollarSign, Download, CreditCard, Wallet, ArrowUpRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';

export const Payments = () => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    contractId: '',
    amount: 0,
    paymentMethod: 'Credit Card' as Payment['paymentMethod'],
    paymentType: 'Rental Payment' as Payment['paymentType'],
    status: 'Completed' as Payment['status']
  });

  const loadData = () => {
    setPayments(paymentRepository.getAll());
    setCustomers(customerRepository.getAll());
    setContracts(contractRepository.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCustomer = (contractId?: string) => {
    if (!contractId) return null;
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return null;
    return customers.find(c => c.id === contract.customerId);
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contractId || !formData.amount) return;

    const newPayment: Payment = {
      id: `pay${Date.now()}`,
      contractId: formData.contractId,
      amount: formData.amount,
      date: new Date().toISOString(),
      paymentMethod: formData.paymentMethod,
      paymentType: formData.paymentType,
      status: formData.status,
      receiptNumber: `RCPT-${Math.floor(Math.random() * 90000)}`,
      customerId: 'c1',
      branchId: 'b1',
      employeeId: '1',
      notes: ''
    };
    
    paymentRepository.create(newPayment);
    loadData();
    setIsAddModalOpen(false);
  };

  const filteredPayments = payments.filter(p => {
    const customer = getCustomer(p.contractId);
    return (
      p.id.includes(searchTerm) || 
      (p.contractId && p.contractId.includes(searchTerm)) ||
      (customer && customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const totalRevenue = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Refunded': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      case 'Failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('nav.payments', 'Payments')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('payments.subtitle', 'Manage rental payments, deposits, and refunds')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <DollarSign className="mr-2 h-4 w-4" /> {t('payments.recordPayment', 'Record Payment')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-500 mb-1">{t('payments.totalRevenue', 'Total Revenue')}</p>
                <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400">
                  {t('common.egp', 'EGP')} {totalRevenue.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-500 mb-1">{t('payments.pendingPayments', 'Pending Payments')}</p>
                <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-400">
                  {t('common.egp', 'EGP')} {pendingPayments.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{t('payments.activeDeposits', 'Active Security Deposits')}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('common.egp', 'EGP')} 25,000
                </h3>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2">
              <Button variant="outline" className="bg-gray-100 dark:bg-gray-800">{t('common.all', 'All')}</Button>
              <Button variant="ghost">{t('payments.deposits', 'Deposits')}</Button>
              <Button variant="ghost">{t('payments.rentals', 'Rentals')}</Button>
            </div>
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                placeholder={t('payments.searchPlaceholder', 'Search by ID or customer...')} 
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
                <TableHead className="pl-6">{t('payments.transactionId', 'Transaction ID')}</TableHead>
                <TableHead>{t('common.customer', 'Customer')}</TableHead>
                <TableHead>{t('common.contract', 'Contract')}</TableHead>
                <TableHead>{t('common.date', 'Date')}</TableHead>
                <TableHead>{t('payments.typeAndMethod', 'Type & Method')}</TableHead>
                <TableHead>{t('payments.amount', 'Amount')}</TableHead>
                <TableHead>{t('common.status', 'Status')}</TableHead>
                <TableHead className="text-right pr-6">{t('common.actions', 'Action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const customer = getCustomer(payment.contractId);
                
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="pl-6 font-medium text-gray-900 dark:text-white">
                      #{payment.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{customer?.fullName || t('common.unknown', 'Unknown')}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-600 hover:underline cursor-pointer">#{payment.contractId}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{payment.paymentType}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <CreditCard className="w-3 h-3" /> {payment.paymentMethod}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold">{t('common.egp', 'EGP')} {payment.amount.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {t(`common.status.${payment.status.toLowerCase()}`, payment.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                    {t('payments.noTransactions', 'No transactions found.')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Record Payment Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('payments.recordPayment', 'Record Payment')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleAddPayment}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-payment-form" onSubmit={handleAddPayment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.contract', 'Contract')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.contractId}
                onChange={e => setFormData({...formData, contractId: e.target.value})}
                required
              >
                <option value="" disabled>{t('payments.selectContract', 'Select Contract')}</option>
                {contracts.filter(c => c.status === 'Active').map(c => (
                  <option key={c.id} value={c.id}>{c.id}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('payments.amount', 'Amount (EGP)')}</label>
              <Input 
                required 
                type="number"
                value={formData.amount} 
                onChange={e => setFormData({...formData, amount: Number(e.target.value)})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('payments.method', 'Payment Method')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.paymentMethod}
                onChange={e => setFormData({...formData, paymentMethod: e.target.value as any})}
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('payments.type', 'Payment Type')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.paymentType}
                onChange={e => setFormData({...formData, paymentType: e.target.value as any})}
              >
                <option value="Rental Payment">Rental Payment</option>
                <option value="Security Deposit">Security Deposit</option>
                <option value="Fine">Fine</option>
                <option value="Damage Fee">Damage Fee</option>
                <option value="Refund">Refund</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.status', 'Status')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
