# MTS Darussalam Serui

Official website for MTS Darussalam Serui - A modern school website built with Next.js.

## Features

- **School Information Display** - Showcase school details, features, and facilities
- **Blog & News** - Dynamic blog/news section
- **Guru & Staff Management** - Display teachers and staff members
- **Ekstrakurikuler** - Extracurricular activities showcase
- **OSIS & Organization** - Student organization and positions
- **Testimonials** - Testimonials from students/alumni
- **Admin Panel** - Secure admin dashboard for content management
- **Authentication** - JWT-based authentication system

## Tech Stack

- **Next.js 16** - Full-stack React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Reusable UI components
- **Drizzle ORM** - TypeScript-first ORM
- **MySQL** - Database
- **Turborepo** - Monorepo build system
- **Bun** - Package manager

## Prerequisites

- Bun (recommended) or Node.js
- MySQL database
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BadryansahBangsawan/MTS-DARUSALAM-SERUI.git
cd MTS-DARUSSALAM-SERUI
```

2. Install dependencies:
```bash
bun install
```

## Environment Setup

Create a `.env` file in `apps/web/` directory with the following variables:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
JWT_SECRET="your-secret-key-here"
```

Replace with your actual MySQL credentials and a secure JWT secret.

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE mts_darussalam;
```

2. Update `DATABASE_URL` in `apps/web/.env` with your database connection string

3. Push the database schema:
```bash
bun run db:push
```

4. (Optional) Seed initial data:
```bash
cd packages/db
bun run seed
```

## Running the Application

Start the development server:

```bash
bun run dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Admin Panel: http://localhost:3001/admin

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run check-types` - Check TypeScript types
- `bun run dev:web` - Run web app only
- `bun run db:push` - Push schema to database
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:generate` - Generate database types
- `bun run db:migrate` - Run database migrations

## Project Structure

```
MTS_DARUSSALAM/
├── apps/
│   └── web/                # Next.js application
│       ├── src/
│       │   ├── app/        # App router pages
│       │   ├── components/ # React components
│       │   └── lib/        # Utilities & helpers
│       └── public/         # Static assets
└── packages/
    ├── db/                 # Database schema & migrations
    ├── config/             # Shared configurations
    └── env/                # Environment variables
```

## Admin Access

Access the admin panel at `/admin/login`. Default credentials need to be created via the database or API.

## Building for Production

```bash
bun run build
```

Then start the production server:
```bash
bun start
```

## License

This project is proprietary and confidential.
