import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, MoreHorizontal, Phone, Mail, Calendar } from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  company?: string;
  value: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  lastContact: string;
};

const initialLeads: Lead[] = [
  { id: '1', name: 'Mohammed Ali', company: 'TechCorp LLC', value: 45000, status: 'New', lastContact: '2 hours ago' },
  { id: '2', name: 'Sarah Wilson', value: 3500, status: 'Contacted', lastContact: '1 day ago' },
  { id: '3', name: 'Ahmed Hassan', company: 'Global Traders', value: 120000, status: 'Qualified', lastContact: '3 days ago' },
  { id: '4', name: 'Fatima Zahra', value: 8000, status: 'Proposal', lastContact: '1 week ago' },
  { id: '5', name: 'Omar Farooq', company: 'BuildRite Contracting', value: 85000, status: 'New', lastContact: 'Just now' },
];

const COLUMNS = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'] as const;

export const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const getLeadsByStatus = (status: Lead['status']) => leads.filter(l => l.status === status);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Leads</h1>
          <p className="text-gray-500 text-sm mt-1">Manage corporate and retail inquiries</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Lead
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-6 pb-4 min-w-max">
          {COLUMNS.map(column => {
            const columnLeads = getLeadsByStatus(column);
            const totalValue = columnLeads.reduce((sum, lead) => sum + lead.value, 0);

            return (
              <div 
                key={column} 
                className="w-80 flex flex-col bg-gray-100 dark:bg-gray-800/50 rounded-xl"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column)}
              >
                <div className="p-4 flex justify-between items-center flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">{column}</h3>
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full">
                      {columnLeads.length}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    EGP {totalValue.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnLeads.map(lead => (
                    <Card 
                      key={lead.id} 
                      className="cursor-grab active:cursor-grabbing hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{lead.name}</h4>
                            {lead.company && <p className="text-xs text-gray-500">{lead.company}</p>}
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                        
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">
                          EGP {lead.value.toLocaleString()}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-blue-600"><Phone className="h-3.5 w-3.5" /></button>
                            <button className="text-gray-400 hover:text-blue-600"><Mail className="h-3.5 w-3.5" /></button>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 gap-1">
                            <Calendar className="h-3 w-3" /> {lead.lastContact}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {columnLeads.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-500">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
