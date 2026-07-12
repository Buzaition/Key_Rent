import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Filter, Car, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';

// Using local state for damages since there's no repository yet, but we'll add fake CRUD.
const initialDamages = [
  { id: 'DMG-001', vehicle: 'Toyota Camry 2023', plate: 'DXB 12345', date: '2023-10-15', severity: 'Minor', status: 'Repaired', cost: '1,500 EGP', description: 'Scratched front bumper' },
  { id: 'DMG-002', vehicle: 'Honda Civic 2022', plate: 'AUH 9876', date: '2023-11-02', severity: 'Major', status: 'Pending Repair', cost: '12,000 EGP', description: 'Rear-end collision, trunk damage' },
  { id: 'DMG-003', vehicle: 'Nissan Patrol 2023', plate: 'SHJ 456', date: '2023-11-10', severity: 'Moderate', status: 'In Shop', cost: '4,500 EGP', description: 'Cracked windshield and side mirror' },
];

export const Damages = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [damages, setDamages] = useState(initialDamages);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    vehicle: '',
    plate: '',
    date: new Date().toISOString().split('T')[0],
    severity: 'Minor',
    status: 'Pending Repair',
    cost: '0 EGP',
    description: ''
  });

  const handleAddDamage = (e: React.FormEvent) => {
    e.preventDefault();
    const newDamage = {
      id: `DMG-00${damages.length + 4}`,
      ...formData
    };
    setDamages([newDamage, ...damages]);
    setIsAddModalOpen(false);
  };

  const filteredDamages = damages.filter(d => 
    d.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('damages.title', 'Damage Reports')}</h1>
          <p className="text-gray-500 text-sm mt-1">{t('damages.subtitle', 'Track vehicle damages and repair statuses')}</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> {t('damages.reportDamage', 'Report Damage')}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder={t('damages.searchPlaceholder', 'Search by vehicle or plate...')}
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
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('common.id', 'ID')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('common.vehicle', 'Vehicle')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('common.date', 'Date')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('damages.severity', 'Severity')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('common.status', 'Status')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">{t('damages.estCost', 'Est. Cost')}</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">{t('common.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredDamages.map((damage) => (
                <tr key={damage.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-medium text-sm">{damage.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Car className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{damage.vehicle}</p>
                        <p className="text-xs text-gray-500">{damage.plate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{damage.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      damage.severity === 'Minor' ? 'bg-yellow-100 text-yellow-800' :
                      damage.severity === 'Major' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {t(`damages.severity.${damage.severity.toLowerCase()}`, damage.severity)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      damage.status === 'Repaired' ? 'bg-emerald-100 text-emerald-800' :
                      damage.status === 'In Shop' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {t(`damages.status.${damage.status.replace(' ', '').toLowerCase()}`, damage.status)}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium">{damage.cost}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <ImageIcon className="w-4 h-4 mr-2" /> {t('damages.photos', 'Photos')}
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredDamages.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    {t('damages.noDamages', 'No damages found')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Damage Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('damages.reportDamage', 'Report Damage')}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddDamage}>
              {t('common.save', 'Save')}
            </Button>
          </>
        }
      >
        <form id="add-damage-form" onSubmit={handleAddDamage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.vehicle', 'Vehicle')}</label>
              <Input 
                required 
                value={formData.vehicle} 
                onChange={e => setFormData({...formData, vehicle: e.target.value})} 
                placeholder="Toyota Camry 2023" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('vehicles.plateNumber', 'Plate Number')}</label>
              <Input 
                required 
                value={formData.plate} 
                onChange={e => setFormData({...formData, plate: e.target.value})} 
                placeholder="DXB 12345" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.date', 'Date')}</label>
              <Input 
                required 
                type="date"
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('damages.estCost', 'Estimated Cost')}</label>
              <Input 
                required 
                value={formData.cost} 
                onChange={e => setFormData({...formData, cost: e.target.value})} 
                placeholder="1,500 EGP"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('damages.severity', 'Severity')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.severity}
                onChange={e => setFormData({...formData, severity: e.target.value})}
              >
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Major">Major</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('common.status', 'Status')}</label>
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-100"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Pending Repair">Pending Repair</option>
                <option value="In Shop">In Shop</option>
                <option value="Repaired">Repaired</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{t('damages.description', 'Description')}</label>
              <Input 
                required 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                placeholder="Describe the damage..." 
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
