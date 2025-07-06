'use client';
import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users2,
  Settings,
  LayoutDashboard,
  FileText,
  CreditCard,
  User,
  Mail,
  MessageSquare,
  PieChart,
  BarChart3,
  ArrowUpDown,
  HelpCircle,
  Layers,
  Database
} from 'lucide-react';

export interface SubMenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface MenuItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: SubMenuItem[];
}

export interface SidebarCategory {
  title: string;
  items: MenuItem[];
}

export const sidebarConfig: SidebarCategory[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home
      },
      {
        title: 'Analytics',
        href: '/analytics',
        icon: LineChart
      }
    ]
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Products',
        icon: Package,
        submenu: [
          {
            title: 'All Products',
            href: '/products',
            icon: Package
          },
          {
            title: 'Categories',
            href: '/products/categories',
            icon: Layers
          },
          {
            title: 'Inventory',
            href: '/products/inventory',
            icon: Database
          }
        ]
      },
      {
        title: 'Orders',
        icon: ShoppingCart,
        submenu: [
          {
            title: 'All Orders',
            href: '/orders',
            icon: ShoppingCart
          },
          {
            title: 'Invoices',
            href: '/orders/invoices',
            icon: FileText
          },
          {
            title: 'Payments',
            href: '/orders/payments',
            icon: CreditCard
          }
        ]
      },
      {
        title: 'Customers',
        href: '/customers',
        icon: Users2
      }
    ]
  },
  {
    title: 'Reports',
    items: [
      {
        title: 'Sales Reports',
        href: '/reports/sales',
        icon: PieChart
      },
      {
        title: 'Performance',
        href: '/reports/performance',
        icon: BarChart3
      },
      {
        title: 'Transactions',
        href: '/reports/transactions',
        icon: ArrowUpDown
      }
    ]
  },
  {
    title: 'Support',
    items: [
      {
        title: 'Messages',
        href: '/support/messages',
        icon: MessageSquare
      },
      {
        title: 'Help Center',
        href: '/support/help',
        icon: HelpCircle
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Account',
        href: '/settings/account',
        icon: User
      },
      {
        title: 'System',
        href: '/settings/system',
        icon: Settings
      }
    ]
  }
];
