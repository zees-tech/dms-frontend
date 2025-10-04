# Modern Dashboard Application

A comprehensive Next.js dashboard application with authentication, dynamic theming, and responsive design.

## Features

- 🔐 **Authentication System** - Login/logout with JWT tokens
- 🎨 **Dynamic Theming** - Light/dark mode with multiple color schemes
- 🎭 **Font Customization** - Multiple font family options
- 📱 **Responsive Design** - Works on all device sizes
- 🧭 **Navigation** - Collapsible sidebar with active states
- 📊 **Dashboard Pages** - Analytics, users, settings, and more
- 🔧 **Modern Stack** - Next.js 15, TypeScript, Tailwind CSS

## Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard route group
│   │   ├── dashboard/           # Main dashboard page
│   │   ├── users/              # Users management
│   │   ├── analytics/          # Analytics page
│   │   └── settings/           # Settings page
│   ├── api/                    # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   └── users/              # User management endpoints
│   ├── login/                  # Login page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page (redirects to dashboard)
├── components/                  # Reusable components
│   ├── auth/                   # Authentication components
│   ├── layout/                 # Layout components (Header, Sidebar, Footer)
│   └── ui/                     # UI components (ThemeSelector, etc.)
├── contexts/                   # React contexts
│   ├── AuthContext.tsx         # Authentication state management
│   └── ThemeContext.tsx        # Theme state management
└── lib/                        # Utility libraries
    ├── auth.ts                 # Authentication utilities
    └── theme.ts                # Theme configuration
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Authentication

The app includes a mock authentication system. Use these credentials to log in:

- **Admin:** admin@example.com / password123
- **User:** user@example.com / password123

## Theme System

The application supports:

- **Theme Modes:** Light, Dark, System
- **Color Schemes:** Blue, Green, Purple, Orange, Red
- **Font Families:** Inter, Roboto, Poppins, Open Sans

All theme settings are persisted in localStorage and applied dynamically.

## API Routes

- `POST /api/auth` - Login/Register
- `GET /api/auth` - Get current user
- `GET /api/users` - Get users list
- `POST /api/users` - Create new user

## Customization

### Adding New Pages

1. Create a new page in `app/(dashboard)/your-page/page.tsx`
2. Wrap content with `DashboardLayout`
3. Add navigation item to `components/layout/Sidebar.tsx`

### Adding New Color Schemes

1. Add color scheme to `lib/theme.ts`
2. Update `colorSchemes` object with your colors
3. Add option to `ThemeSelector` component

### Extending Authentication

Replace the mock auth service in `lib/auth.ts` with your preferred authentication provider (Auth0, Firebase, etc.).

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management
- **Next.js API Routes** - Backend API

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.
