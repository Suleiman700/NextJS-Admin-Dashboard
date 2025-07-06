'use client';

import React from 'react';
import { useTranslations } from '@/lib/translations';

interface DashboardContainerProps {
    children: React.ReactNode;
}

export default function DashboardContainer({ children }: DashboardContainerProps) {
    const { direction } = useTranslations();
    
    // Determine padding based on direction
    const sidebarPadding = direction === 'rtl' ? 'sm:pr-64' : 'sm:pl-64';
    
    return (
        <div className={`flex flex-col sm:gap-4 sm:py-4 ${sidebarPadding}`}>
            {children}
        </div>
    );
}
