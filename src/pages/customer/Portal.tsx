import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Car, FileText, Settings, CreditCard, LogOut, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CustomerPortal = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-800 p-1.5 rounded-lg">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">KEY Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-medium text-sm hidden sm:block">Welcome, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-gray-500 mt-1">Manage your active rentals, reservations, and profile</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Rental Widget */}
          <Card className="md:col-span-2 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 dark:text-emerald-500 flex items-center gap-2">
                <Car className="w-5 h-5" /> Current Rental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Toyota Camry 2023</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Return Date: Tomorrow, 10:00 AM</p>
                </div>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Extend</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">My Reservations</h3>
                  <p className="text-xs text-gray-500">View past and upcoming</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Invoices & Payments</h3>
                  <p className="text-xs text-gray-500">Manage payment methods</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Profile Settings</h3>
                  <p className="text-xs text-gray-500">Update documents and info</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
