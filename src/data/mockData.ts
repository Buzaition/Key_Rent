import type { Customer, Vehicle, Branch, User } from '../types';

import toyotaCamryImg from '../assets/vehicles/toyota_camry.jpg';
import hyundaiElantraImg from '../assets/vehicles/hyundai_elantra.jpg';
import kiaSportageImg from '../assets/vehicles/kia_sportage.jpg';
import nissanSunnyImg from '../assets/vehicles/nissan_sunny.jpg';
import mgZsImg from '../assets/vehicles/mg_zs.jpg';
import bmw320iImg from '../assets/vehicles/bmw_320i.jpg';
import mercedesC180Img from '../assets/vehicles/mercedes_c180.jpg';

export const mockUsers: User[] = [
  { id: '1', email: 'admin@key.demo', name: 'System Admin', role: 'Admin' },
  { id: '2', email: 'manager@key.demo', name: 'Branch Manager', role: 'Branch Manager', branchId: 'b1' },
  { id: '3', email: 'reception@key.demo', name: 'Receptionist', role: 'Receptionist', branchId: 'b1' },
  { id: '4', email: 'fleet@key.demo', name: 'Fleet Officer', role: 'Fleet Officer' },
  { id: '5', email: 'accountant@key.demo', name: 'Accountant', role: 'Accountant' },
  { id: '6', email: 'customer@key.demo', name: 'Demo Customer', role: 'Customer' },
];

export const mockBranches: Branch[] = [
  { id: 'b1', name: 'Cairo Main', arabicName: 'الفرع الرئيسي - القاهرة', address: '15 Tahrir Square', city: 'Cairo', phone: '+20 2 2123 4567', email: 'cairo@key.demo', workingHours: '08:00 - 22:00', status: 'Active' },
  { id: 'b2', name: 'Cairo Airport T3', arabicName: 'مطار القاهرة مبنى 3', address: 'Terminal 3', city: 'Cairo', phone: '+20 2 2765 4321', email: 'airport@key.demo', workingHours: '24/7', status: 'Active' },
  { id: 'b3', name: 'Alexandria Corniche', arabicName: 'كورنيش الإسكندرية', address: 'San Stefano Grand Plaza', city: 'Alexandria', phone: '+20 3 5987 6543', email: 'alex@key.demo', workingHours: '10:00 - 23:00', status: 'Active' },
  { id: 'b4', name: 'Giza Pyramids', arabicName: 'فرع الأهرامات - الجيزة', address: 'Al Haram Street', city: 'Giza', phone: '+20 2 3456 7890', email: 'giza@key.demo', workingHours: '09:00 - 21:00', status: 'Active' },
];

const firstNames = ['Ahmed', 'Mahmoud', 'Mohamed', 'Omar', 'Ali', 'Mostafa', 'Ibrahim', 'Hussein', 'Youssef', 'Hassan'];
const lastNames = ['Hassan', 'Ali', 'Ibrahim', 'Mahmoud', 'Fawzy', 'Salem', 'Gaber', 'Ezzat', 'Mansour', 'Said'];
const arFirstNames = ['أحمد', 'محمود', 'محمد', 'عمر', 'علي', 'مصطفى', 'إبراهيم', 'حسين', 'يوسف', 'حسن'];
const arLastNames = ['حسن', 'علي', 'إبراهيم', 'محمود', 'فوزي', 'سالم', 'جابر', 'عزت', 'منصور', 'سعيد'];

export const mockCustomers: Customer[] = Array.from({ length: 60 }).map((_, i) => ({
  id: `c${i + 1}`,
  fullName: `${firstNames[i % 10]} ${lastNames[(i + 3) % 10]}`,
  arabicName: `${arFirstNames[i % 10]} ${arLastNames[(i + 3) % 10]}`,
  nationalIdOrPassport: `2${Math.floor(Math.random() * 9000000000000) + 1000000000000}`,
  nationality: 'Egypt',
  dateOfBirth: `19${80 + (i % 20)}-0${(i % 9) + 1}-1${i % 9}`,
  gender: 'Male',
  phone: `+20 10 ${Math.floor(Math.random() * 9000000) + 1000000}`,
  email: `${firstNames[i % 10].toLowerCase()}.${lastNames[(i + 3) % 10].toLowerCase()}@example.com`,
  address: `${i * 10 + 5} Main Street, District ${i % 5}`,
  city: i % 2 === 0 ? 'Cairo' : 'Alexandria',
  drivingLicenseNumber: `DL${Math.floor(Math.random() * 90000) + 10000}`,
  licenseIssueDate: '2020-01-10',
  licenseExpiryDate: '2030-01-10',
  licenseCountry: 'Egypt',
  customerType: i % 4 === 0 ? 'Corporate' : 'Individual',
  companyName: i % 4 === 0 ? 'Tech Solutions Egypt' : undefined,
  blacklistStatus: false,
  riskLevel: 'Low',
  outstandingBalance: i % 3 === 0 ? 500 : 0,
  totalRentals: i % 5 + 1,
  totalSpending: (i % 5 + 1) * 1500,
  notes: 'Regular customer',
  createdAt: '2023-01-10T10:00:00Z'
}));

const vehicleModels = [
  { brand: 'Toyota', model: 'Camry', category: 'Sedan', rate: 900, value: 1200000, image: toyotaCamryImg },
  { brand: 'Hyundai', model: 'Elantra', category: 'Sedan', rate: 850, value: 950000, image: hyundaiElantraImg },
  { brand: 'Kia', model: 'Sportage', category: 'SUV', rate: 1500, value: 1600000, image: kiaSportageImg },
  { brand: 'Nissan', model: 'Sunny', category: 'Economy', rate: 600, value: 650000, image: nissanSunnyImg },
  { brand: 'MG', model: 'ZS', category: 'SUV', rate: 1200, value: 1100000, image: mgZsImg },
  { brand: 'BMW', model: '320i', category: 'Luxury', rate: 4500, value: 3500000, image: bmw320iImg },
  { brand: 'Mercedes', model: 'C180', category: 'Luxury', rate: 5000, value: 3800000, image: mercedesC180Img },
];

export const mockVehicles: Vehicle[] = Array.from({ length: 120 }).map((_, i) => {
  const modelInfo = vehicleModels[i % vehicleModels.length];
  return {
    id: `v${i + 1}`,
    fleetNumber: `FLT-0${i + 10}`,
    plateNumber: `أ ب ج ${Math.floor(Math.random() * 9000) + 1000}`,
    vin: `WAUZZZ${Math.floor(Math.random() * 900000000)}`,
    brand: modelInfo.brand,
    model: modelInfo.model,
    year: 2023 + (i % 2),
    category: modelInfo.category as any,
    color: ['White', 'Black', 'Silver', 'Red', 'Blue'][i % 5],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: modelInfo.category === 'SUV' ? 7 : 5,
    engineSize: modelInfo.category === 'Luxury' ? '2.0L Turbo' : '1.6L',
    currentMileage: Math.floor(Math.random() * 50000) + 5000,
    branchId: `b${(i % 4) + 1}`,
    dailyRate: modelInfo.rate,
    weeklyRate: modelInfo.rate * 6,
    monthlyRate: modelInfo.rate * 22,
    securityDeposit: modelInfo.category === 'Luxury' ? 10000 : 3000,
    purchaseDate: '2023-12-01',
    purchaseCost: modelInfo.value,
    currentValue: modelInfo.value * 0.9,
    registrationNumber: `REG-${Math.floor(Math.random() * 90000) + 10000}`,
    registrationExpiry: '2024-12-01',
    insuranceProvider: 'Misr Insurance',
    insurancePolicyNumber: `POL-${Math.floor(Math.random() * 90000) + 10000}`,
    insuranceExpiry: '2024-12-01',
    lastServiceMileage: 10000,
    nextServiceMileage: 20000,
    lastServiceDate: '2024-03-15',
    nextServiceDate: '2024-09-15',
    status: i % 3 === 0 ? 'Rented' : 'Available',
    ownershipType: 'Owned',
    notes: 'Good condition',
    images: [modelInfo.image]
  };
});
