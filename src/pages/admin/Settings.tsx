import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Building, Settings as SettingsIcon, Bell, Shield, PaintBucket, Save } from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure company branding, notifications, and permissions</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <Card className="w-full md:w-64 shrink-0 h-fit">
          <CardContent className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('company')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'company' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Building className="w-4 h-4" /> Company Profile
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'branding' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <PaintBucket className="w-4 h-4" /> Branding & Theme
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'notifications' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'security' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Shield className="w-4 h-4" /> Security & Roles
            </button>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="flex-1">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle>
              {activeTab === 'company' && 'Company Profile'}
              {activeTab === 'branding' && 'Branding & Theme'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'security' && 'Security & Roles'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                    <Input defaultValue="KEY Car Rental" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number</label>
                    <Input defaultValue="CR-98237498" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Support Email</label>
                    <Input defaultValue="support@keyrent.demo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Phone</label>
                    <Input defaultValue="+971 4 123 4567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Headquarters Address</label>
                    <Input defaultValue="Business Bay, Dubai, UAE" />
                  </div>
                </div>
                <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-6 mt-6">
                  <Button>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600">
                    <span className="text-sm text-gray-500">Logo</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Company Logo</h3>
                    <p className="text-sm text-gray-500 mb-3">Upload your official logo. PNG or SVG recommended, max 2MB.</p>
                    <Button variant="outline" size="sm">Upload New Logo</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Primary Colors</h3>
                  <div className="flex gap-4">
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-blue-800 border-4 border-white dark:border-gray-900 shadow"></div>
                      <p className="text-xs text-center text-gray-500">Primary</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full bg-[#0B0F19] border-4 border-white dark:border-gray-900 shadow"></div>
                      <p className="text-xs text-center text-gray-500">Dark</p>
                    </div>
                    <div className="space-y-2 flex items-center ml-4">
                      <Button variant="outline" size="sm">Edit Palette</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-6 mt-6">
                  <Button>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </div>
              </div>
            )}

            {(activeTab === 'notifications' || activeTab === 'security') && (
              <div className="py-12 text-center text-gray-500">
                <SettingsIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Module in Development</h3>
                <p>This configuration area is currently being built by ICC Company.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
