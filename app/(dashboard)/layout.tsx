import Link from 'next/link';
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
    Users2
} from 'lucide-react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import { VercelLogo } from '@/components/icons';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';
import { LanguageSelector } from './language-selector';
import { Sidebar } from './sidebar';
import { sidebarConfig } from './sidebar-config';

export default function DashboardLayout({
                                            children
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <main className="flex min-h-screen w-full flex-col bg-muted/40">
                <Sidebar />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
                    <header
                        className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <MobileNav />
                        <DashboardBreadcrumb />
                        <SearchInput />
                        <LanguageSelector />
                        <User />
                    </header>
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                        {children}
                    </main>
                </div>
                <Analytics />
            </main>
        </Providers>
    );
}

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs overflow-y-auto">
                <div className="flex items-center mb-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <VercelLogo className="h-6 w-6" />
                        <span className="text-lg">Acme Inc</span>
                    </Link>
                </div>
                
                <nav className="grid gap-2">
                    {sidebarConfig.map((category, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {category.title}
                            </h3>
                            <div className="space-y-1">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {item.submenu ? (
                                            <>
                                                <div className="flex items-center gap-3 px-2 py-1.5 text-muted-foreground">
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="font-medium">{item.title}</span>
                                                </div>
                                                <div className="ml-6 space-y-1">
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                                                        >
                                                            <subItem.icon className="h-4 w-4" />
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href || '#'}
                                                className="flex items-center gap-3 rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground"
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

function DashboardBreadcrumb() {
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="#">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="#">Products</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>All Products</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
