'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PanelLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { VercelLogo } from '@/components/icons';
import { sidebarConfig } from '@/components/layout/sidebar-config';
import { useTranslations } from '@/lib/translations';

export function MobileNav() {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
    const { t, setLanguage, language, appLanguages, direction } = useTranslations();

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side={direction === 'rtl' ? 'right' : 'left'} className="sm:max-w-xs overflow-y-auto">
                <div className="flex items-center mb-6">
                    <Link href="/" className="flex items-center gap-2">
                        <VercelLogo className="h-6 w-6" />
                        <span className="font-semibold">Acme Inc</span>
                    </Link>
                </div>
                <div dir={direction} className="space-y-2">
                    {sidebarConfig.map((category, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {t(category.title.toLowerCase())}
                            </h3>
                            <div className="space-y-1">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {item.submenu ? (
                                            <>
                                                <button
                                                    onClick={() => toggleCategory(`${category.title}-${item.title}`)}
                                                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className="h-5 w-5" />
                                                        <span>{t(item.title.toLowerCase())}</span>
                                                    </div>
                                                    {openCategories[`${category.title}-${item.title}`] ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                </button>
                                                {openCategories[`${category.title}-${item.title}`] && (
                                                    <div className="ml-6 space-y-1 mt-1">
                                                        {item.submenu.map((subItem, subIndex) => (
                                                            <Link
                                                                key={subIndex}
                                                                href={subItem.href}
                                                                className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                                                            >
                                                                <subItem.icon className="h-4 w-4" />
                                                                <span>{t(subItem.title.toLowerCase())}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href || '#'}
                                                className="flex items-center gap-3 rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground"
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
                </div>
            </SheetContent>
        </Sheet>
    );
}
