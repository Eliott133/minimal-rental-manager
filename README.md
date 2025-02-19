# Rental Manager

A modern and simplified property management system built with React, TypeScript and Supabase. The application was designed to help property managers and landlords manage their properties, tenants and documents efficiently. The idea for this project came from my personal experience of finding it inconvenient for my landlord to manually send me rent receipts, which motivated me to create an automated and smoother solution for managing rent and related documents.


## Features

   - **Property Management** : You can add, edit, and delete properties, with information such as address, size, prices, and more.

   - **Tenant Management** : The app helps track tenant information, including contact details, current leases, and rent payments.

   - **Document Management** : You can add and manage documents related to properties or tenants (e.g., lease agreements, maintenance reports, etc.).

   - **Dashboard** : A complete overview of all properties, tenants, and documents. You can quickly see important information and navigate to key sections.

   - **Authentication and Authorization** : A secure authentication system for property managers. You can also protect certain routes to prevent unauthorized access.

## Future features 

   - **Payment Management** : A feature to track rent payments, send reminders, and generate receipts for tenants.

   - **Maintenance Request Tracking** : A module to track tenant maintenance requests, with notifications and repair progress.

   - **Email Notifications** : Implemented an email notification system to alert managers of new requests, late rent payments, or other important events.

   - **Lease Management** : Added the ability to manage property leases, including duration, terms, and the ability to renew leases online.

   - **User Interface Improvements** : Additional UI improvements to provide an even smoother and more responsive user experience.

   - **Reporting Dashboard** : An advanced dashboard to generate reports on property status, payments, documents, etc.

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router v6
  - Lucide React Icons

- **Backend**
  - Supabase
  - PostgreSQL
  - Row Level Security

## Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher
- npm or yarn
- A Supabase account
- Supabase CLI

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eliott133/minimal-rental-manager.git
   cd minimal-rental-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Click "Connect to Supabase" in the top right of the project
   - Follow the setup instructions to connect your project

4. **Install tables**
   With supabase CLI :
   ```bash
   supabase db push
   ```

5. **Environment Variables**
   Create a `.env` file in the root directory with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_GOOGLE_MAP_API_KEY=your-google-maps-api_key
   ```
   
6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open the application**
   Visit `http://localhost:5173` in your browser

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── lib/              # Utilities and configurations
├── types/            # TypeScript type definitions
└── main.tsx          # Application entry point
```

## Key Components

- `AuthProvider`: Manages authentication state
- `ProtectedRoute`: Handles route protection
- `Dashboard`: Main overview page
- `Properties`: Property management
- `Tenants`: Tenant management
- `Documents`: Document management

## Database Schema

The application uses the following main tables:
- `properties`: Property information
- `tenants`: Tenant details
- `maintenance_requests`: Maintenance tracking
- `documents`: Document management

## Development

- **Running tests**
  ```bash
  npm run test
  ```

- **Building for production**
  ```bash
  npm run build
  ```

