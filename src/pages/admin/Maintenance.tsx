import React, { useState, useEffect } from 'react';
import type { Vehicle } from '@/types';
import { vehicleRepository } from '@/data/repositories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Wrench, AlertTriangle, Search, CheckCircle2, FileText } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export const Maintenance = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setVehicles(vehicleRepository.getAll());
  }, []);

  const maintenanceVehicles = vehicles.filter(v => 
    (v.status === 'Maintenance' || (v.nextServiceMileage - v.currentMileage) < 1000) &&
    (v.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
     v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
     v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance & Service</h1>
          <p className="text-gray-500 text-sm mt-1">Track vehicle repairs and scheduled maintenance</p>
        </div>
        <Button>
          <Wrench className="mr-2 h-4 w-4" /> Schedule Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-400">
                  {vehicles.filter(v => v.status === 'Maintenance').length}
                </h3>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-500">Currently in Shop</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-900 dark:text-red-400">
                  {vehicles.filter(v => (v.nextServiceMileage - v.currentMileage) < 0).length}
                </h3>
                <p className="text-sm font-medium text-red-700 dark:text-red-500">Overdue for Service</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400">
                  {vehicles.filter(v => (v.nextServiceMileage - v.currentMileage) > 0 && (v.nextServiceMileage - v.currentMileage) < 1000).length}
                </h3>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-500">Upcoming (1,000 km)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <CardTitle>Action Required</CardTitle>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                placeholder="Search vehicles..." 
                className="pl-10 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Vehicle</TableHead>
                <TableHead>Plate</TableHead>
                <TableHead>Current Mileage</TableHead>
                <TableHead>Service Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceVehicles.map((vehicle) => {
                const distanceLeft = vehicle.nextServiceMileage - vehicle.currentMileage;
                const isOverdue = distanceLeft < 0;
                
                return (
                  <TableRow key={vehicle.id}>
                    <TableCell className="pl-6 font-medium text-gray-900 dark:text-white">
                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                    </TableCell>
                    <TableCell className="font-mono text-sm">{vehicle.plateNumber}</TableCell>
                    <TableCell>{vehicle.currentMileage.toLocaleString()} km</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{vehicle.nextServiceMileage.toLocaleString()} km</span>
                        <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-amber-500'}`}>
                          {isOverdue ? `Overdue by ${Math.abs(distanceLeft).toLocaleString()} km` : `Due in ${distanceLeft.toLocaleString()} km`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vehicle.status === 'Maintenance' ? (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium flex w-fit items-center gap-1">
                          <Wrench className="w-3 h-3" /> In Shop
                        </span>
                      ) : isOverdue ? (
                        <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-medium flex w-fit items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Overdue
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium flex w-fit items-center gap-1">
                          Upcoming
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {vehicle.status === 'Maintenance' ? (
                        <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Complete
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-1" /> Create Work Order
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
