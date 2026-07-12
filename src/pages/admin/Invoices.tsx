import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { contractRepository, customerRepository } from '@/data/repositories';
import type { Customer } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Download, Mail } from 'lucide-react';

interface InvoiceView {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  contractRef: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export const Invoices = () => {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<InvoiceView[]>([]);
  const [_customers, setCustomers] = useState<Record<string, Customer>>({});
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    const custs = customerRepository.getAll().reduce((acc, c) => {
      acc[c.id] = c;
      return acc;
    }, {} as Record<string, Customer>);
    setCustomers(custs);

    const contracts = contractRepository.getAll();
    
    // Generate mock invoices from contracts
    const mappedInvoices: InvoiceView[] = contracts.map(contract => {
      // Mock some statuses
      let status: 'Paid' | 'Unpaid' | 'Overdue' = 'Unpaid';
      if (contract.paidAmount >= contract.totalAmount) {
        status = 'Paid';
      } else if (new Date(contract.expectedReturnDate) < new Date() && contract.status !== 'Completed') {
        status = 'Overdue';
      } else {
        // Randomize paid/unpaid for demo
        status = Math.random() > 0.5 ? 'Paid' : 'Unpaid';
      }

      return {
        id: contract.id,
        invoiceNumber: `INV-${contract.contractNumber?.split('-')[1] || Math.floor(Math.random() * 90000)}`,
        date: contract.startDate,
        customerName: custs[contract.customerId]?.fullName || 'Unknown',
        contractRef: contract.contractNumber || 'N/A',
        amount: contract.totalAmount,
        status,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setInvoices(mappedInvoices);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Unpaid':
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    }
  };

  const filteredInvoices = statusFilter === 'All' 
    ? invoices 
    : invoices.filter(inv => inv.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('invoices.title', 'Invoices')}
          </h1>
        </div>
        <div className="flex gap-2">
          {['All', 'Paid', 'Unpaid', 'Overdue'].map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={statusFilter === status ? 'bg-blue-600' : ''}
            >
              {status === 'All' ? t('common.all', 'All') : t(`invoices.${status.toLowerCase()}`, status)}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('invoices.invoiceNumber', 'Invoice Number')}</TableHead>
              <TableHead>{t('invoices.date', 'Date')}</TableHead>
              <TableHead>{t('invoices.customer', 'Customer')}</TableHead>
              <TableHead>{t('invoices.contractRef', 'Contract Ref')}</TableHead>
              <TableHead>{t('invoices.amount', 'Amount')}</TableHead>
              <TableHead>{t('invoices.status', 'Status')}</TableHead>
              <TableHead className="text-right">{t('common.actions', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell>
                  {new Date(invoice.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {invoice.customerName}
                </TableCell>
                <TableCell className="text-gray-500">
                  {invoice.contractRef}
                </TableCell>
                <TableCell>
                  {invoice.amount.toLocaleString()} {t('common.egp')}
                </TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {t(`invoices.${invoice.status.toLowerCase()}`, invoice.status)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" title={t('invoices.sendEmail', 'Send Email')}>
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" title={t('invoices.download', 'Download PDF')}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  {t('common.noRecords', 'No records found')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
