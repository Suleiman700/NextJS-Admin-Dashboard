'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sidebarConfig, MenuItem, SubMenuItem } from './sidebar-config';
import { VercelLogo } from '@/components/icons';
import { useTranslations } from '@/lib/translations';

export function Sidebar() {
    const pathname = usePathname();
    const { t, setLanguage, language, appLanguages, direction } = useTranslations();

    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Determine sidebar position based on direction
    let sidebarPosition = 'left-0'; // We keep the sidebar on the left side regardless of direction
    if (direction === 'rtl') {
        sidebarPosition = 'right-0';
    }

    return (
        <aside
            className={`fixed inset-y-0 ${sidebarPosition} z-10 hidden w-64 flex-col border-r bg-background sm:flex`}>
            {/* Logo */}
            <div className="flex h-14 items-center border-b px-4 flex-shrink-0">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                >
                    <VercelLogo className="h-6 w-6" />
                    <span className="text-lg">Acme Inc</span>
                </Link>
            </div>

            {/* Navigation - Using a separate scrollable container */}
            <div className="flex-1 overflow-y-auto">
                <nav className="px-2 py-4" dir={direction}>
                    {sidebarConfig.map((category, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground sticky top-0 bg-background">
                                {t(category.title.toLowerCase())}
                            </h3>
                            <div className="space-y-1">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {item.submenu ? (
                                            // Item with submenu
                                            <div className="space-y-1">
                                                <button
                                                    onClick={() => toggleCategory(`${category.title}-${item.title}`)}
                                                    className={cn(
                                                        'flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium hover:bg-muted/50',
                                                        pathname.startsWith(item.href || '#') ? 'bg-muted text-foreground' : 'text-muted-foreground'
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className="h-5 w-5" />
                                                        <span>{t(item.title.toLowerCase())}</span>
                                                    </div>
                                                    {openCategories[`${category.title}-${item.title}`] ? (
                                                        <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                                                    )}
                                                </button>

                                                {/* Submenu - Absolute positioning with fixed height */}
                                                {openCategories[`${category.title}-${item.title}`] && (
                                                    <div className="ml-6 space-y-1 pt-1">
                                                        {item.submenu.map((subItem, subIndex) => (
                                                            <Link
                                                                key={subIndex}
                                                                href={subItem.href}
                                                                className={cn(
                                                                    'flex items-center gap-3 rounded-md px-4 py-2 text-sm hover:bg-muted/50',
                                                                    pathname === subItem.href ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'
                                                                )}
                                                            >
                                                                <subItem.icon className="h-4 w-4" />
                                                                <span>{t(subItem.title.toLowerCase())}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // Regular item without submenu
                                            <Link
                                                href={item.href || '#'}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-muted/50',
                                                    pathname === item.href ? 'bg-muted text-foreground' : 'text-muted-foreground'
                                                )}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span>{t(item.title.toLowerCase())}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
