'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/lib/translations';

export default function DashboardContainer({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { direction } = useTranslations();
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Determine sidebar position based on direction
    let langClass = 'sm:pl-64'; // We keep the sidebar on the left side regardless of direction
    if (direction === 'rtl') {
        langClass = 'sm:pr-64';
    }

    return (
        <div className={`flex flex-col sm:gap-4 sm:py-4 ${langClass}`}>
            {children}
        </div>
    );
}
