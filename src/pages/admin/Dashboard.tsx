import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Car, Users, CalendarCheck, AlertTriangle, DollarSign, Activity, Wrench, FileText
} from 'lucide-react';
import { mockVehicles, mockCustomers } from '@/data/mockData';

export const Dashboard = () => {
  const { t } = useTranslation();

  // Mock Summary Data
  const stats = [
    { title: t('dashboard.totalVehicles', 'Total Vehicles'), value: mockVehicles.length.toString(), icon: Car, trend: '+4%', color: 'text-blue-600' },
    { title: t('dashboard.availableVehicles', 'Available Vehicles'), value: mockVehicles.filter(v => v.status === 'Available').length.toString(), icon: CalendarCheck, trend: t('dashboard.optimal', 'Optimal'), color: 'text-emerald-600' },
    { title: t('dashboard.activeRentals', 'Active Rentals'), value: mockVehicles.filter(v => v.status === 'Rented').length.toString(), icon: Activity, trend: '+12%', color: 'text-indigo-600' },
    { title: t('dashboard.maintenance', 'Maintenance'), value: mockVehicles.filter(v => v.status === 'Maintenance').length.toString(), icon: AlertTriangle, trend: t('dashboard.requiresAction', '2 requires action'), color: 'text-amber-500' },
    { title: t('dashboard.totalCustomers', 'Total Customers'), value: mockCustomers.length.toString(), icon: Users, trend: t('dashboard.thisMonth', '+28 this month'), color: 'text-purple-600' },
    { title: t('dashboard.monthlyRevenue', 'Monthly Revenue'), value: 'EGP 124,500', icon: DollarSign, trend: '+15.3%', color: 'text-emerald-600' },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 59000 },
    { name: 'Jun', revenue: 85000 },
    { name: 'Jul', revenue: 124500 },
  ];

  const statusData = [
    { name: 'Available', value: 45, color: '#10b981' }, // Emerald
    { name: 'Rented', value: 35, color: '#3b82f6' }, // Blue
    { name: 'Maintenance', value: 10, color: '#f59e0b' }, // Amber
    { name: 'Overdue', value: 5, color: '#ef4444' }, // Red
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('dashboard.title', 'Executive Dashboard')}</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.revenueTrends', 'Revenue Trend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `EGP ${value/1000}k`} />
                  <RechartsTooltip 
                    formatter={(value) => [`EGP ${value}`, 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#1e40af" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.fleetStatus', 'Fleet Status Distribution')}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="h-80 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold">120</span>
                <span className="text-sm text-gray-500">{t('dashboard.total', 'Total')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('dashboard.todayActivity', "Today's Pick-ups & Returns")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">{t('common.customer', 'Customer')}</th>
                    <th className="px-4 py-3">{t('common.vehicle', 'Vehicle')}</th>
                    <th className="px-4 py-3">{t('common.time', 'Time')}</th>
                    <th className="px-4 py-3">{t('common.type', 'Type')}</th>
                    <th className="px-4 py-3">{t('common.status', 'Status')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Ahmed Hassan</td>
                    <td className="px-4 py-3">Toyota Camry (A 12345)</td>
                    <td className="px-4 py-3">10:00 AM</td>
                    <td className="px-4 py-3"><span className="text-emerald-600 font-medium">Pick-up</span></td>
                    <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">Ready</span></td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Sarah Johnson</td>
                    <td className="px-4 py-3">Nissan Patrol (B 98765)</td>
                    <td className="px-4 py-3">02:30 PM</td>
                    <td className="px-4 py-3"><span className="text-blue-600 font-medium">Return</span></td>
                    <td className="px-4 py-3"><span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.importantAlerts', 'Important Alerts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-red-100 p-2 rounded-full h-fit">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Overdue Rental</p>
                  <p className="text-xs text-gray-500">Contract #1042 is 2 days overdue.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-amber-100 p-2 rounded-full h-fit">
                  <Wrench className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Due</p>
                  <p className="text-xs text-gray-500">2 vehicles require scheduled oil change.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded-full h-fit">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Insurance Expiring</p>
                  <p className="text-xs text-gray-500">Nissan Patrol insurance expires in 5 days.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
