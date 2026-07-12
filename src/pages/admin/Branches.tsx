import React, { useState, useEffect } from 'react';
import type { Branch } from '@/types';
import { branchRepository } from '@/data/repositories';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, Plus, Building2, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setBranches(branchRepository.getAll());
  }, []);

  const filteredBranches = branches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.city.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Branches & Locations</h1>
          <p className="text-gray-500 text-sm mt-1">Manage physical rental locations and contact info</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            placeholder="Search branches by name or city..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map(branch => (
          <Card key={branch.id} className="overflow-hidden">
            <div className="h-32 bg-blue-800 relative">
              <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 rounded-xl flex items-center justify-center text-blue-800 dark:text-blue-500">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            <CardContent className="pt-10 px-6 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{branch.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {branch.city}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3 text-gray-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{branch.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3 text-gray-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{branch.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3 text-gray-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Mon-Sun: 08:00 AM - 10:00 PM</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="outline" className="flex-1">Manage</Button>
                <Button variant="secondary" className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 border-none">
                  <ExternalLink className="w-4 h-4 mr-2" /> Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredBranches.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No branches found.
          </div>
        )}
      </div>
    </div>
  );
};
