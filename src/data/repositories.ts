import { LocalStorageDB } from '../utils/localStorageDB';
import type { Customer, Vehicle, Branch, Reservation, Contract, Payment, User } from '../types';
import { mockCustomers, mockVehicles, mockBranches, mockUsers } from './mockData';

// Repositories
export const userRepository = new LocalStorageDB<User>('key_users');
export const customerRepository = new LocalStorageDB<Customer>('key_customers');
export const vehicleRepository = new LocalStorageDB<Vehicle>('key_vehicles');
export const branchRepository = new LocalStorageDB<Branch>('key_branches');
export const reservationRepository = new LocalStorageDB<Reservation>('key_reservations');
export const contractRepository = new LocalStorageDB<Contract>('key_contracts');
export const paymentRepository = new LocalStorageDB<Payment>('key_payments');

// Initialization function
export const initializeMockData = () => {
  const isInitialized = localStorage.getItem('key_initialized_v6');
  
  if (!isInitialized) {
    userRepository.setAll(mockUsers);
    customerRepository.setAll(mockCustomers);
    vehicleRepository.setAll(mockVehicles);
    branchRepository.setAll(mockBranches);

    // Generate tons of mock reservations
    const reservations: Reservation[] = [];
    const contracts: Contract[] = [];
    const payments: Payment[] = [];

    // Past 30 days and future 30 days
    const today = new Date();
    
    for (let i = 0; i < 80; i++) {
      const c = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
      const v = mockVehicles[Math.floor(Math.random() * mockVehicles.length)];
      
      const isPast = i < 40;
      const daysOffset = isPast ? -Math.floor(Math.random() * 30) - 1 : Math.floor(Math.random() * 30) + 1;
      const duration = Math.floor(Math.random() * 14) + 1;
      
      const start = new Date(today);
      start.setDate(today.getDate() + daysOffset);
      
      const end = new Date(start);
      end.setDate(start.getDate() + duration);

      const status = isPast ? (Math.random() > 0.2 ? 'Completed' : 'Cancelled') : (Math.random() > 0.5 ? 'Pending' : 'Active');

      const res: Reservation = {
        id: `RES-${10000 + i}`,
        reservationNumber: `RN-${10000 + i}`,
        customerId: c.id,
        branchId: 'b1',
        pickupBranchId: 'b1',
        returnBranchId: 'b1',
        pickupDate: start.toISOString(),
        returnDate: end.toISOString(),
        vehicleCategory: v.category,
        assignedVehicleId: v.id,
        dailyPrice: v.dailyRate,
        numberOfDays: duration,
        additionalServices: [],
        discount: 0,
        taxes: duration * v.dailyRate * 0.15,
        estimatedTotal: duration * v.dailyRate * 1.15,
        securityDeposit: v.securityDeposit,
        paymentStatus: status === 'Completed' ? 'Paid' : 'Pending',
        status: status as any,
        assignedEmployeeId: '1',
        notes: '',
        createdAt: new Date().toISOString(),
        source: 'Website'
      };
      reservations.push(res);

      if (status === 'Completed' || status === 'Active') {
        const contract: Contract = {
          id: `CON-${20000 + i}`,
          contractNumber: `CN-${20000 + i}`,
          reservationId: res.id,
          customerId: c.id,
          vehicleId: v.id,
          pickupBranchId: 'b1',
          returnBranchId: 'b1',
          startDate: res.pickupDate,
          expectedReturnDate: res.returnDate,
          actualReturnDate: status === 'Completed' ? res.returnDate : undefined,
          startMileage: v.currentMileage - (duration * 100),
          endMileage: status === 'Completed' ? v.currentMileage : undefined,
          fuelLevelStart: 100,
          fuelLevelEnd: status === 'Completed' ? 100 : undefined,
          dailyRate: v.dailyRate,
          includedKilometers: duration * 200,
          extraKilometerRate: 5,
          securityDeposit: v.securityDeposit,
          discount: 0,
          tax: duration * v.dailyRate * 0.15,
          additionalServicesTotal: 0,
          totalAmount: res.estimatedTotal,
          paidAmount: status === 'Completed' ? res.estimatedTotal : 0,
          remainingAmount: status === 'Completed' ? 0 : res.estimatedTotal,
          status: status === 'Completed' ? 'Completed' : 'Active',
          assignedEmployeeId: '1',
          termsAccepted: true,
          notes: ''
        };
        contracts.push(contract);

        payments.push({
          id: `PAY-${30000 + i}`,
          contractId: contract.id,
          amount: res.estimatedTotal,
          date: res.pickupDate,
          paymentMethod: Math.random() > 0.5 ? 'Visa' : 'Cash',
          paymentType: 'Rental',
          status: 'Completed',
          receiptNumber: `RCPT-${Math.floor(Math.random() * 90000)}`,
          customerId: c.id,
          branchId: 'b1',
          employeeId: '1',
          notes: ''
        });

        if (status === 'Active') {
          payments.push({
            id: `PAY-DEP-${30000 + i}`,
            contractId: contract.id,
            amount: v.securityDeposit,
            date: res.pickupDate,
            paymentMethod: 'Visa',
            paymentType: 'Deposit',
            status: 'Pending',
            receiptNumber: `RCPT-${Math.floor(Math.random() * 90000)}`,
            customerId: c.id,
            branchId: 'b1',
            employeeId: '1',
            notes: 'Auth only'
          });
        }
      }
    }

    reservationRepository.setAll(reservations);
    contractRepository.setAll(contracts);
    paymentRepository.setAll(payments);
    
    localStorage.setItem('key_initialized_v6', 'true');
  }
};

// Also expose a function to force reset
export const resetMockData = () => {
  localStorage.removeItem('key_initialized_v4');
  initializeMockData();
};
