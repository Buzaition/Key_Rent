import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  LayoutDashboard, Users, Car, CalendarCheck, FileText, Settings, 
  LogOut, Menu, Search, Bell, Moon, Sun, KeyRound, ArrowLeftRight,
  Briefcase, Wrench, ShieldAlert, CreditCard, Receipt,
  Building2, Activity, Globe
} from 'lucide-react';

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme, language, toggleTheme, setLanguage } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isDark = theme === 'dark';
  const isAr = language === 'ar';
  const { t } = useTranslation();

  const allNavigation = [
    { name: t('nav.dashboard'), href: '/app/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Branch Manager'] },
    
    // CRM
    { name: t('nav.leads'), href: '/app/leads', icon: ArrowLeftRight, roles: ['Admin', 'Branch Manager', 'Receptionist'] },
    { name: t('nav.customers'), href: '/app/customers', icon: Users, roles: ['Admin', 'Branch Manager', 'Receptionist'] },
    { name: t('nav.corporate'), href: '/app/corporate', icon: Briefcase, roles: ['Admin', 'Branch Manager'] },

    // Rental Operations
    { name: t('nav.reservations'), href: '/app/reservations', icon: CalendarCheck, roles: ['Admin', 'Branch Manager', 'Receptionist'] },
    { name: t('nav.contracts'), href: '/app/contracts', icon: FileText, roles: ['Admin', 'Branch Manager', 'Receptionist'] },

    // Fleet
    { name: t('nav.fleet'), href: '/app/vehicles', icon: Car, roles: ['Admin', 'Branch Manager', 'Fleet Officer'] },
    { name: t('nav.maintenance'), href: '/app/maintenance', icon: Wrench, roles: ['Admin', 'Fleet Officer'] },
    { name: t('nav.damages'), href: '/app/damages', icon: ShieldAlert, roles: ['Admin', 'Fleet Officer', 'Branch Manager'] },

    // Finance
    { name: t('nav.payments'), href: '/app/payments', icon: CreditCard, roles: ['Admin', 'Accountant', 'Branch Manager', 'Receptionist'] },
    { name: t('nav.invoices'), href: '/app/invoices', icon: Receipt, roles: ['Admin', 'Accountant'] },

    // Management
    { name: t('nav.branches'), href: '/app/branches', icon: Building2, roles: ['Admin'] },
    { name: t('nav.reports'), href: '/app/reports', icon: Activity, roles: ['Admin', 'Branch Manager', 'Accountant'] },
    { name: t('nav.settings'), href: '/app/settings', icon: Settings, roles: ['Admin'] },
  ];

  const navigation = allNavigation.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden text-gray-900 dark:text-gray-100">
      
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0B0F19] text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-800 bg-[#0B0F19] shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded-md">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-widest text-xl">KEY</span>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <div className="mb-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('app.menu')}</p>
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ICC Footer in Sidebar */}
        <div className="p-4 border-t border-gray-800 shrink-0">
          <a href="https://www.icc-collab.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
            {/* ICC Abstract Logo SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 640 640" fill="none" role="img" aria-label="Logo" className="rounded-full overflow-hidden">
                {/* Background */}
                <path xmlns="http://www.w3.org/2000/svg" d="M0 0 C211.2 0 422.4 0 640 0 C640 211.2 640 422.4 640 640 C428.8 640 217.6 640 0 640 C0 428.8 0 217.6 0 0 Z " fill="#010715" transform="translate(0,0)"/>
                
                {/* Outer blue C */}
              <path d="M0 0
                  C0.84304688 0.61230469 1.68609375 1.22460938 2.5546875 1.85546875
                  C6.48309451 4.71681711 6.48309451 4.71681711 8 6
                  C8 6.33 8 6.66 8 7
                  C7.09445122 7.00358253 7.09445122 7.00358253 6.17060852 7.00723743
                  C-8.58942944 7.06664187 -23.34931811 7.14235169 -38.10917664 7.23571491
                  C-45.24724847 7.28048254 -52.38527252 7.31993974 -59.5234375 7.34643555
                  C-65.75259346 7.36957123 -71.98159577 7.40313908 -78.21062946 7.44870156
                  C-81.50205508 7.4724266 -84.79330142 7.48973193 -88.08480835 7.49761391
                  C-128.93749959 7.605266 -163.56117696 19.46016943 -193.5 48.125
                  C-213.15235885 68.3356645 -225.20399795 94.36930163 -230 122
                  C-230.13148438 122.74765625 -230.26296875 123.4953125 -230.3984375 124.265625
                  C-232.84030102 141.5566586 -230.91253293 160.34227414 -226 177
                  C-225.79761719 177.71671875 -225.59523437 178.4334375 -225.38671875 179.171875
                  C-216.0570278 209.62215465 -195.15072338 238.63284119 -167 254
                  C-166.30229492 254.38317383 -165.60458984 254.76634766 -164.88574219 255.16113281
                  C-153.97980593 261.11631669 -143.60203046 266.04138404 -131.5 269.125
                  C-130.49324219 269.38925781 -129.48648438 269.65351563 -128.44921875 269.92578125
                  C-119.18577683 272.31752183 -110.74125366 273.15520599 -101.18969727 273.20532227
                  C-100.01824661 273.21522186 -98.84679596 273.22512146 -97.6398468 273.23532104
                  C-93.78205358 273.26681523 -89.92424807 273.29164566 -86.06640625 273.31640625
                  C-83.38597708 273.33698621 -80.70555337 273.3579366 -78.02513123 273.37937927
                  C-71.70009669 273.42916752 -65.3750376 273.47415741 -59.04995531 273.51740164
                  C-51.84554798 273.56689302 -44.64118475 273.62176677 -37.43682015 273.67708123
                  C-22.62458863 273.7906882 -7.81231316 273.89757306 7 274
                  C3.74269128 283.77192615 -16.35850713 291.56111709 -25 296
                  C-60.0180513 312.58029453 -101.231634 317.36513884 -139 308
                  C-140.34636769 307.36006542 -141.68237754 306.6972039 -143 306
                  C-144.74193537 305.57006372 -146.49342344 305.17804456 -148.25 304.8125
                  C-155.02633701 303.19551429 -161.12308073 300.50119171 -167.43359375 297.62109375
                  C-169.42030156 296.71804475 -171.42187655 295.84154557 -173.46484375 295.07421875
                  C-187.5545962 289.10398466 -200.57087128 279.39599574 -211.72265625 269.08984375
                  C-213.66734107 267.3052702 -215.64929781 265.61254813 -217.6875 263.9375
                  C-221.55142204 260.62684162 -224.74902595 256.90473483 -228 253
                  C-228.46712402 252.45585449 -228.93424805 251.91170898 -229.41552734 251.35107422
                  C-257.98750431 218.05424615 -272.89659609 173.92687977 -270 130
                  C-267.82550685 106.85419307 -262.15310748 85.85833294 -252 65
                  C-251.68836914 64.34692871 -251.37673828 63.69385742 -251.05566406 63.02099609
                  C-244.43562167 49.2800298 -235.2930038 37.21370827 -225 26
                  C-223.94039062 24.78763672 -223.94039062 24.78763672 -222.859375 23.55078125
                  C-218.20691111 18.25741672 -213.42672842 13.48767705 -208 9
                  C-207.17886719 8.29101562 -206.35773438 7.58203125 -205.51171875 6.8515625
                  C-198.74860991 1.11613301 -191.6487072 -3.53456978 -184 -8
                  C-182.87464844 -8.68191406 -181.74929687 -9.36382812 -180.58984375 -10.06640625
                  C-172.37557193 -14.98915599 -164.01050308 -18.77716385 -155 -22
                  C-153.79214844 -22.44214844 -152.58429688 -22.88429687 -151.33984375 -23.33984375
                  C-101.65710874 -40.24327686 -41.86055021 -32.17639307 0 0Z" fill="#2785F3" transform="translate(405 169)"></path>

              {/* Inner white G/C shape */}
              <path d="M0 0
                  C1.51440516 -0.02377484 3.02879434 -0.04858577 4.54316711 -0.07434082
                  C9.46123709 -0.1520531 14.37937279 -0.19877065 19.29785156 -0.24169922
                  C21.00178297 -0.25780701 22.70571414 -0.27393953 24.40964508 -0.29009628
                  C31.49581185 -0.35479367 38.58196045 -0.41100814 45.66834641 -0.44496346
                  C55.78137358 -0.49377373 65.89096301 -0.59371763 76.00269485 -0.764166
                  C83.14189151 -0.88037487 90.28016906 -0.93886953 97.42028642 -0.95472515
                  C101.67472803 -0.96565793 105.92547686 -1.00138321 110.17888641 -1.09903336
                  C135.89962915 -1.66131543 135.89962915 -1.66131543 141.69560242 2.00727081
                  C145.00779856 5.38769923 146.5983252 9.08246853 147.82939911 13.59660721
                  C148.87207134 16.98957914 150.65303698 19.92123796 152.37597656 23.01611328
                  C154.84083398 27.85842182 156.17765976 32.33449305 157.43847656 37.57861328
                  C156.60193763 37.58007984 155.76539869 37.5815464 154.90351009 37.5830574
                  C134.4941316 37.62020267 114.08491814 37.67931929 93.67567348 37.76251602
                  C83.80567104 37.80222739 73.93574741 37.83465988 64.06567383 37.84960938
                  C55.45710573 37.86266701 46.84871165 37.88973591 38.24024159 37.93322635
                  C33.68736154 37.95574914 29.13469537 37.97152952 24.58175468 37.97049713
                  C20.2847487 37.96974504 15.98821386 37.98791305 11.69132996 38.01978111
                  C10.1254091 38.0282077 8.55943495 38.03008012 6.99350166 38.02441597
                  C-11.47986598 37.9665648 -27.54366182 42.14028961 -41.28027344 55.24658203
                  C-52.52178076 66.73832839 -57.84802191 80.19235006 -57.8059082 96.28710938
                  C-57.55570851 110.77252667 -51.84351167 125.15851549 -41.70605469 135.62548828
                  C-26.21064481 149.73788343 -8.66847214 152.87022883 11.55834961 152.89746094
                  C13.15601601 152.90677703 14.75367761 152.91694815 16.35133362 152.92790222
                  C20.65631995 152.95502698 24.96127389 152.97029919 29.26632285 152.98333025
                  C33.77734291 152.9990381 38.28829756 153.02580363 42.79927063 153.05136108
                  C51.32704446 153.09801406 59.85483079 153.13482312 68.38266641 153.16803396
                  C78.09740847 153.206351 87.8120846 153.25573585 97.52677095 153.30601811
                  C117.49729071 153.40913728 137.46785227 153.49846233 157.43847656 153.57861328
                  C156.96756798 155.18412234 156.49383426 156.78880296 156.01890564 158.39312744
                  C155.75539779 159.28682163 155.49188993 160.18051582 155.220397 161.10129166
                  C154.34558964 163.87290254 153.24395626 166.37272365 151.87988281 168.93798828
                  C151.17702148 170.27023437 151.17702148 170.27023437 150.45996094 171.62939453
                  C149.97849609 172.52013672 149.49703125 173.41087891 149.00097656 174.32861328
                  C148.52337891 175.23482422 148.04578125 176.14103516 147.55371094 177.07470703
                  C146.21150605 179.59709482 144.86839017 182.10479618 143.43847656 184.57861328
                  C143.03608261 185.60379059 142.63368866 186.6289679 142.21910095 187.68521118
                  C140.56147755 190.11174153 139.65794146 190.53352226 136.73575687 191.13391113
                  C132.9945002 191.35037122 129.27699165 191.36697944 125.53222656 191.32324219
                  C124.08626254 191.32809963 122.64030524 191.33553986 121.19436646 191.34536743
                  C117.26327614 191.36419934 113.33318101 191.34531096 109.40216827 191.31870317
                  C105.27152918 191.29602307 101.14093741 191.3042949 97.01025391 191.30819702
                  C90.05615088 191.30996456 83.10243702 191.28779497 76.1484375 191.25097656
                  C68.1574418 191.20890431 60.16702153 191.20156334 52.17593765 191.21410048
                  C44.45307209 191.2255888 36.73040529 191.21406193 29.00756836 191.19175339
                  C25.74174244 191.18256641 22.47604023 191.18066769 19.21020508 191.18492508
                  C-23.39611024 191.21785502 -23.39611024 191.21785502 -42.56152344 181.57861328
                  C-43.45613281 181.14935547 -44.35074219 180.72009766 -45.27246094 180.27783203
                  C-69.25510671 168.0803546 -85.35575952 147.08198221 -93.73730469 121.78564453
                  C-100.51228908 95.42421235 -96.7937348 70.14938375 -83.87011719 46.48095703
                  C-79.83749939 39.82854113 -74.93094399 34.18326559 -69.56152344 28.57861328
                  C-68.75714844 27.71236328 -67.95277344 26.84611328 -67.12402344 25.95361328
                  C-57.97185231 17.47111322 -48.40232539 10.86030077 -36.74902344 6.39111328
                  C-35.82645752 6.03412354 -35.82645752 6.03412354 -34.88525391 5.66992188
                  C-23.39825371 1.4700886 -12.17521196 0.1088087 0 0Z" fill="#EAEAED" transform="translate(308.5615234375 214.42138671875)"></path>

              {/* G horizontal bar */}
              <path d="M0 0H238V37H0Z" fill="#EAEAED" transform="translate(284 290)"></path>
            </svg>
            <div>
              <p className="text-[10px] text-gray-400 leading-tight">{t('common.developedBy')}</p>
              <p className="text-xs font-bold text-white leading-tight">{t('common.iccCompany')}</p>
            </div>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-1">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="max-w-md w-full hidden sm:block">
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const query = fd.get('search');
                if (query) alert(`Global Search for: ${query}\n\n(In a full backend setup, this would open a global search modal resolving to Customers, Vehicles, or Contracts.)`);
              }} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input name="search" type="text" placeholder={t('app.searchPlaceholder')} className="pl-10 h-9 bg-gray-100 border-transparent dark:bg-gray-700 dark:border-transparent focus:bg-white dark:focus:bg-gray-600" />
              </form>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Globe className="w-4 h-4" />
              {t('app.viewWebsite', 'View Website')}
            </Link>
            <Button variant="default" size="sm" className="hidden sm:flex">
              {t('app.quickCreate')}
            </Button>
            
            <button 
              onClick={() => setLanguage(isAr ? 'en' : 'ar')} 
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 flex items-center gap-1 font-medium"
              title="Toggle Language"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm">{isAr ? 'EN' : 'عربي'}</span>
            </button>

            <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            </button>
            <div className="relative flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.role}</span>
              </div>
              <button onClick={handleLogout} className="p-1 text-gray-400 hover:text-red-500" title="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
