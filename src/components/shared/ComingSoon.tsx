import React from 'react';
import { useTranslation } from 'react-i18next';
import { Timer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ComingSoon = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-200 dark:border-blue-800">
        <Timer className="w-12 h-12 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        {t('common.comingSoonText', 'We are working hard to bring this feature to you. Stay tuned for updates!')}
      </p>
      <Button onClick={() => navigate(-1)} variant="outline" className="gap-2 px-6">
        <ArrowLeft className="w-4 h-4" />
        {t('common.goBack', 'Go Back')}
      </Button>
    </div>
  );
};
