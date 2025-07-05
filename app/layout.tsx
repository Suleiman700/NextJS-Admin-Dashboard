import './globals.css';
import '@ant-design/v5-patch-for-react-19';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { TranslationsProvider } from '@/lib/translations';

export const metadata = {
    title: 'Next.js App Router + NextAuth + Tailwind CSS',
    description:
        'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="flex min-h-screen w-full flex-col">
        <SessionProvider>
            <TranslationsProvider>
              {children}
            </TranslationsProvider>
        </SessionProvider>
        <Analytics />
        </body>
        </html>
    );
}