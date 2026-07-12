import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './components/shared/SplashScreen';
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/public/Home';
import { Vehicles as PublicVehicles } from './pages/public/Vehicles';
import { Offers } from './pages/public/Offers';
import { Branches as PublicBranches } from './pages/public/Branches';
import { About } from './pages/public/About';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Customers } from './pages/admin/Customers';
import { Leads } from './pages/admin/Leads';
import { Vehicles } from './pages/admin/Vehicles';
import { Maintenance } from './pages/admin/Maintenance';
import { Damages } from './pages/admin/Damages';
import { Reservations } from './pages/admin/Reservations';
import { Contracts } from './pages/admin/Contracts';
import { Payments } from './pages/admin/Payments';
import { Invoices } from './pages/admin/Invoices';
import { Reports } from './pages/admin/Reports';
import { Branches } from './pages/admin/Branches';
import { Settings } from './pages/admin/Settings';
import { Corporate } from './pages/admin/Corporate';
import { Login } from './pages/auth/Login';
import { CustomerPortal } from './pages/customer/Portal';
import { initializeMockData } from './data/repositories';
import { useAuthStore } from './store/authStore';
import { useUIStore } from './store/uiStore';
import { useTranslation } from 'react-i18next';

// Simple PrivateRoute wrapper
const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, language } = useUIStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize LocalStorage Data
    initializeMockData();
    
    // Check if splash was already seen this session
    if (sessionStorage.getItem('key_splash_seen')) {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    // Apply Theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply Language (RTL/LTR)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [theme, language, i18n]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="vehicles" element={<PublicVehicles />} />
          <Route path="offers" element={<Offers />} />
          <Route path="branches" element={<PublicBranches />} />
          <Route path="about" element={<About />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        
        {/* Protected App Routes */}
        <Route 
          path="/app" 
          element={
            <PrivateRoute allowedRoles={['Admin', 'Branch Manager', 'Receptionist', 'Fleet Officer', 'Accountant']}>
              <AppLayout />
            </PrivateRoute>
          } 
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="corporate" element={<Corporate />} />
          <Route path="leads" element={<Leads />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="damages" element={<Damages />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="payments" element={<Payments />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="branches" element={<Branches />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Protected Customer Routes */}
        <Route 
          path="/customer/*" 
          element={
            <PrivateRoute allowedRoles={['Customer']}>
              <CustomerPortal />
            </PrivateRoute>
          } 
        />

        <Route path="/unauthorized" element={<div className="flex h-screen items-center justify-center text-red-500">Access Denied</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
