import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { contractRepository, vehicleRepository, customerRepository, branchRepository } from '@/data/repositories';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const Reports = () => {
  const { t, i18n } = useTranslation();
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [fleetData, setFleetData] = useState<any[]>([]);
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [period, setPeriod] = useState('This Year');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  useEffect(() => {
    // Generate Revenue by Branch
    const branches = branchRepository.getAll();
    const contracts = contractRepository.getAll();
    
    const revByBranch = branches.map(b => {
      const branchContracts = contracts.filter(c => c.pickupBranchId === b.id);
      const totalRev = branchContracts.reduce((sum, c) => sum + c.totalAmount, 0);
      return {
        name: i18n.language === 'ar' && b.arabicName ? b.arabicName : b.name,
        revenue: totalRev
      };
    });
    setRevenueData(revByBranch);

    // Generate Fleet Utilization
    const vehicles = vehicleRepository.getAll();
    const statusCounts = vehicles.reduce((acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const fleetFormatted = Object.keys(statusCounts).map(status => ({
      name: t(`common.status.${status.toLowerCase()}`, status),
      value: statusCounts[status]
    }));
    setFleetData(fleetFormatted);

    // Generate Top Customers
    const customers = customerRepository.getAll();
    const custStats = customers.map(c => {
      const custContracts = contracts.filter(con => con.customerId === c.id);
      return {
        id: c.id,
        name: i18n.language === 'ar' && c.arabicName ? c.arabicName : c.fullName,
        rentals: custContracts.length,
        spent: custContracts.reduce((sum, con) => sum + con.totalAmount, 0)
      };
    }).sort((a, b) => b.spent - a.spent).slice(0, 5);
    
    setTopCustomers(custStats);
  }, [i18n.language, t]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('reports.title', 'Reports & Analytics')}
          </h1>
        </div>
        <div className="flex gap-2">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="This Month">{t('reports.thisMonth', 'This Month')}</option>
            <option value="Last Month">{t('reports.lastMonth', 'Last Month')}</option>
            <option value="This Year">{t('reports.thisYear', 'This Year')}</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t('reports.export', 'Export Report')}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('reports.revenueByBranch', 'Revenue by Branch')}
          </h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: '#f3f4f6', opacity: 0.1 }}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('reports.fleetUtilization', 'Fleet Utilization')}
          </h3>
          <div className="h-80 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fleetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fleetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t('reports.topCustomers', 'Top Customers')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">{t('reports.customerName', 'Customer Name')}</th>
                <th className="px-4 py-3">{t('reports.rentals', 'Total Rentals')}</th>
                <th className="px-4 py-3 text-right">{t('reports.totalSpent', 'Total Spent')}</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((cust, i) => (
                <tr key={cust.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    {cust.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {cust.rentals}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-600 dark:text-blue-400">
                    {cust.spent.toLocaleString()} {t('common.egp')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
