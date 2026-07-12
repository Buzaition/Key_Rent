export type Role = 'Admin' | 'Branch Manager' | 'Receptionist' | 'Fleet Officer' | 'Accountant' | 'Customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  branchId?: string;
  avatar?: string;
}

export type CustomerType = 'Individual' | 'Corporate' | 'VIP' | 'Long-term' | 'Walk-in';

export interface Customer {
  id: string;
  fullName: string;
  arabicName?: string;
  nationalIdOrPassport: string;
  nationality: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  secondaryPhone?: string;
  email: string;
  address: string;
  city: string;
  drivingLicenseNumber: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  licenseCountry: string;
  customerType: CustomerType;
  companyName?: string;
  taxNumber?: string;
  emergencyContact?: string;
  blacklistStatus: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  outstandingBalance: number;
  totalRentals: number;
  totalSpending: number;
  notes: string;
  createdAt: string;
}

export type VehicleCategory = 'Economy' | 'Compact' | 'Sedan' | 'SUV' | 'Luxury' | 'Sports' | 'Van' | 'Pickup' | 'Commercial';

export type VehicleStatus = 'Available' | 'Reserved' | 'Rented' | 'Due for Return' | 'Overdue' | 'Maintenance' | 'Inspection' | 'Damaged' | 'Accident' | 'Out of Service' | 'Sold';

export interface Vehicle {
  id: string;
  fleetNumber: string;
  plateNumber: string;
  vin: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  color: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  engineSize: string;
  currentMileage: number;
  branchId: string;
  parkingLocation?: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  securityDeposit: number;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  registrationNumber: string;
  registrationExpiry: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  lastServiceMileage: number;
  nextServiceMileage: number;
  lastServiceDate: string;
  nextServiceDate: string;
  status: VehicleStatus;
  ownershipType: 'Owned' | 'Leased';
  notes: string;
  images: string[];
}

export interface Branch {
  id: string;
  name: string;
  arabicName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  managerId?: string;
  workingHours: string;
  status: 'Active' | 'Inactive';
}

export type ReservationStatus = 'Draft' | 'Pending' | 'Confirmed' | 'Vehicle Assigned' | 'Ready for Pickup' | 'Converted to Contract' | 'Cancelled' | 'No-show' | 'Completed';

export interface Reservation {
  id: string;
  reservationNumber: string;
  customerId: string;
  branchId: string;
  pickupBranchId: string;
  returnBranchId: string;
  pickupDate: string;
  returnDate: string;
  vehicleCategory: VehicleCategory;
  assignedVehicleId?: string;
  dailyPrice: number;
  numberOfDays: number;
  additionalServices: string[];
  discount: number;
  taxes: number;
  estimatedTotal: number;
  securityDeposit: number;
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Refunded';
  status: ReservationStatus;
  assignedEmployeeId: string;
  notes: string;
  createdAt: string;
  source: 'Website' | 'Phone' | 'Walk-in' | 'Corporate' | 'App';
}

export type ContractStatus = 'Draft' | 'Active' | 'Extended' | 'Due Today' | 'Overdue' | 'Return in Progress' | 'Completed' | 'Cancelled' | 'Disputed';

export interface Contract {
  id: string;
  contractNumber: string;
  reservationId?: string;
  customerId: string;
  vehicleId: string;
  pickupBranchId: string;
  returnBranchId: string;
  startDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  startMileage: number;
  endMileage?: number;
  fuelLevelStart: number; // Percentage 0-100
  fuelLevelEnd?: number; // Percentage 0-100
  dailyRate: number;
  includedKilometers: number;
  extraKilometerRate: number;
  securityDeposit: number;
  discount: number;
  tax: number;
  additionalServicesTotal: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: ContractStatus;
  assignedEmployeeId: string;
  termsAccepted: boolean;
  notes: string;
}

export interface Payment {
  id: string;
  receiptNumber: string;
  customerId: string;
  contractId?: string;
  reservationId?: string;
  invoiceId?: string;
  paymentType: 'Reservation' | 'Rental' | 'Deposit' | 'Extension' | 'Fine' | 'Damage' | 'Refund' | 'Other';
  amount: number;
  paymentMethod: 'Cash' | 'Visa' | 'Mastercard' | 'Bank transfer' | 'Vodafone Cash' | 'InstaPay' | 'Online payment' | 'Corporate credit';
  date: string;
  branchId: string;
  employeeId: string;
  referenceNumber?: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Cancelled' | 'Refunded' | 'Partially refunded';
  notes?: string;
}
