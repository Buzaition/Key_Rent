import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Filter, Briefcase, FileText, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';

// Mock Corporate since it doesn't have a repository yet, but we will add fake CRUD.
const initialCorporate = [
  { id: 'CORP-001', name: 'Tech Solutions LLC', contact: 'Ahmed Hassan', phone: '+20 10 1234 5678', email: 'ahmed@techsolutions.eg', activeRentals: 12, totalSpend: '450,000 EGP', status: 'Active' },
  { id: 'CORP-002', name: 'Global Logistics', contact: 'Sarah Ibrahim', phone: '+20 11 9876 5432', email: 'sarah@globallogistics.eg', activeRentals: 45, totalSpend: '1,200,000 EGP', status: 'Active' },
  { id: 'CORP-003', name: 'Nile Tourism', contact: 'Mahmoud Ali', phone: '+20 12 3456 7890', email: 'm.ali@niletourism.eg', activeRentals: 8, totalSpend: '280,000 EGP', status: 'Inactive' },
];

export const Corporate = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [corporates, setCorporates] = useState(initialCorporate);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    status: 'Active'
  });

  const handleAddCorporate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCorp = {
      id: `CORP-00${corporates.length + 4}`,
      activeRentals: 0,
      totalSpend: '0 EGP',
      ...formData
    };
    setCorporates([newCorp, ...corporates]);
    setIsAddModalOpen(false);
  };

  const filteredCorporates = corporates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('corporate.title', 'Corporate Clients')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('corporate.subtitle', 'Manage B2B accounts and bulk rentals')}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> {t('corporate.addCompany', 'Add Company')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('corporate.totalCompanies', 'Total Companies')}</p>
              <h3 className="text-2xl font-bold">{corporates.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('corporate.activeRentals', 'Active B2B Rentals')}</p>
              <h3 className="text-2xl font-bold">{corporates.reduce((acc, c) => acc + c.activeRentals, 0)}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t('corporate.pendingInvoices', 'Pending Invoices')}</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder={t('corporate.searchPlaceholder', 'Search companies...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> {t('common.filter', 'Filter')}
            </Button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('corporate.company', 'Company')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('common.contact', 'Contact')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('corporate.activeRentals', 'Active Rentals')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('corporate.totalSpend', 'Total Spend')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('common.status', 'Status')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">{t('common.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCorporates.map((corp) => (
                <tr key={corp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{corp.name}</p>
                        <p className="text-xs text-gray-500">{corp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{corp.contact}</p>
                    <p className="text-xs text-gray-500">{corp.email}</p>
                    <p className="text-xs text-gray-500">{corp.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-bold">
                      {corp.activeRentals}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium">{corp.totalSpend}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      corp.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {t(`common.status.${corp.status.toLowerCase()}`, corp.status)}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      {t('common.view', 'View')}
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredCorporates.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    {t('corporate.noCompanies', 'No companies found')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Corporate Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('corporate.addCompany', 'Add Company')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddCorporate}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-corporate-form" onSubmit={handleAddCorporate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('corporate.company', 'Company Name')}</label>
              <Input 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Tech Solutions LLC" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.contact', 'Contact Name')}</label>
              <Input 
                required 
                value={formData.contact} 
                onChange={e => setFormData({...formData, contact: e.target.value})} 
                placeholder="Ahmed Hassan" 
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
                placeholder="info@company.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.status', 'Status')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
