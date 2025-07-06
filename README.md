<div align="center"><strong>Next.js Admin Dashboard with Authentication, Multi-language Support, and MySQL Integration</strong></div>
<div align="center">Built with the Next.js App Router and modern best practices</div>
<br />

## Overview

https://github.com/user-attachments/assets/b538ec6f-a066-4e06-aa5f-30ce260146c4

This is a comprehensive admin dashboard starter kit using the following stack:

- **Framework** - [Next.js 13+ (App Router)](https://nextjs.org)
- **Language** - [TypeScript](https://www.typescriptlang.org)
- **Authentication** - [NextAuth.js](https://next-auth.js.org)
- **Database** - [MySQL](https://www.mysql.com) with [Drizzle ORM](https://orm.drizzle.team)
- **UI Components** - [Shadcn UI](https://ui.shadcn.com/)
- **Styling** - [Tailwind CSS](https://tailwindcss.com)
- **Analytics** - [Vercel Analytics](https://vercel.com/analytics)
- **Internationalization** - Custom i18n implementation with RTL support
- **Icons** - [Lucide React](https://lucide.dev)

## Key Features

- **Multi-language Support**: Built-in internationalization with support for multiple languages
- **RTL Support**: Full right-to-left language support for Arabic, Hebrew, and other RTL languages
- **Responsive Design**: Mobile-first approach with responsive sidebar and navigation
- **Authentication**: Secure authentication with NextAuth.js
- **Database Integration**: MySQL database integration using Drizzle ORM
- **Server Components**: Leverages Next.js 13+ server components for improved performance
- **Modern UI**: Clean, modern UI with customizable themes
- **Accessibility**: ARIA-compliant components for better accessibility

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- MySQL server
- npm or yarn

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-admin-dashboard.git
cd nextjs-admin-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the database:
You can import the database from the provided SQL file: `_mysql.sql`


4. Create a `.env` file with the following variables:
```
# Database
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
AUTH_SECRET= your_auth_secret
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Default Login Credentials

Once the application is running, you can log in with the following default credentials:

- **Email**: admin@admin.com
- **Password**: password123

> **Important**: For production environments, make sure to change these default credentials immediately after the first login.

## Project Structure

```
├── app/                     # Next.js App Router
│   ├── (dashboard)/         # Dashboard routes and components
│   ├── api/                 # API routes
│   ├── login/               # Authentication pages
│   └── [...]/               # Other app routes
├── components/              # Reusable UI components
│   ├── layout/              # Layout components
│   └── ui/                  # UI components
├── lib/                     # Utility functions and shared code
│   ├── db.ts                # Database connection
│   └── translations.tsx     # Internationalization utilities
├── public/                  # Static assets
└── ...
```

## Internationalization

The dashboard includes a built-in translation system with support for both LTR and RTL languages. To add a new language:

1. Make sure the language is added to the `app_settings` table (where setting_key is app_languages)
2. Add translations for the language in the `translations` table
3. Use the following code to set the language in the UI:
```tsx
import { useTranslations } from '@/lib/translations';
const { t } = useTranslations();

const translatedText = t(item.title.toLowerCase());
console.log(translatedText);
```
4. Try to change the language and see the logged output

The UI will automatically adjust for RTL languages, including:
- Sidebar position switching to the right side
- Content padding adjusting accordingly
- Text alignment and direction changes
- Button and icon positioning

## Authentication

- Authentication is handled via NextAuth.js.
- Username/password authentication
- Secure session management

## Database Integration

The dashboard uses MySQL with Drizzle ORM for database operations. Server components directly access the database using the `server-only` package to ensure database operations are never exposed to the client.

## Customization

### Themes

You can customize the theme by modifying the Tailwind configuration in `tailwind.config.js`.

### Layout

The dashboard layout is fully customizable. The main components are:
- `layout.tsx` - The main layout wrapper
- `sidebar.tsx` - The sidebar navigation
- `mobile-nav.tsx` - Mobile navigation drawer
- `DashboardContainer.tsx` - Content container with direction-aware padding

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle ORM](https://orm.drizzle.team)
- [Lucide Icons](https://lucide.dev)
