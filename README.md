# HappyDeel Links - URL Shortener (Vite.js)

A modern, fast, and production-ready URL shortener built with Vite.js, React, Supabase, and TailwindCSS. Designed to be deployed on Vercel with custom domain support.

## 🚀 Features

- **Lightning Fast**: Built with Vite.js for instant hot reload and optimized builds
- **Clean UI**: Minimal, responsive design built with TailwindCSS and custom components
- **Fast Redirects**: Optimized for speed with efficient database queries
- **Click Tracking**: Monitor how many times each link has been accessed
- **Auto-increment Slugs**: Automatically generates p1, p2, p3... for easy management
- **Production Ready**: Built with best practices for security and performance

## 🛠 Tech Stack

- **Frontend**: Vite.js + React 18 + TypeScript
- **Styling**: TailwindCSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **UI Components**: Custom components with Radix UI primitives
- **Hosting**: Vercel (compatible with custom domains)

## 📦 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd happydeel-links
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your keys
3. Run the migration in the Supabase SQL Editor:

```sql
-- Copy and paste the contents of supabase/migrations/20250712000937_foggy_rain.sql
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_URL=https://go.happydeel.com
```

### 4. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment on Vercel

### 1. Build and Deploy

```bash
# Build for production
npm run build

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts to link your project
```

### 2. Configure Custom Domain

1. In your Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add `go.happydeel.com` as a custom domain
4. Update your DNS settings to point to Vercel:
   - Add a CNAME record: `go` → `cname.vercel-dns.com`

### 3. Environment Variables in Vercel

Add the same environment variables in your Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_BASE_URL`

## 📊 Database Schema

The app uses the existing `short_links` table:

```sql
CREATE TABLE short_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,           -- e.g., p1, p2, p3
  original_url text NOT NULL,          -- Full destination URL
  click_count integer DEFAULT 0,       -- Number of visits
  created_at timestamptz DEFAULT now() -- Creation timestamp
);
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **Public Access**: Configured for anonymous link creation and access
- **Input Validation**: URL validation on both client side
- **Error Handling**: Comprehensive error handling throughout the app

## 📱 How It Works

### Creating Short Links
1. User enters a long URL in the input field
2. App queries Supabase to get the next available slug number
3. Creates a new record with slug format `p{number}` (p1, p2, p3...)
4. Returns the short URL for copying and sharing

### Redirecting
1. User visits `go.happydeel.com/p1`
2. React Router captures the slug parameter
3. App queries Supabase for the original URL
4. Increments click count asynchronously
5. Redirects user to the original URL

## 🎨 Customization

### Changing the URL Format
To change from `p1, p2, p3...` to a different format, modify the slug generation logic in `src/pages/HomePage.tsx`:

```javascript
// Current: p1, p2, p3...
const newSlug = `p${nextNumber}`

// Custom examples:
const newSlug = `link${nextNumber}`        // link1, link2, link3...
const newSlug = `${nextNumber}`            // 1, 2, 3...
const newSlug = `hd${nextNumber}`          // hd1, hd2, hd3...
```

### Styling
The app uses TailwindCSS with a custom color scheme. Modify styles in:
- Global styles: `src/index.css`
- Component styles: Individual component files
- Tailwind config: `tailwind.config.js`

## 🔧 Performance Optimizations

- **Vite.js**: Lightning-fast development and optimized production builds
- **Database Indexing**: Optimized queries with proper indexes
- **Client-side Routing**: Fast navigation with React Router
- **Incremental Click Tracking**: Non-blocking click count updates
- **Error Boundaries**: Graceful error handling

## 🚀 Vite.js Benefits

- **Instant Server Start**: No bundling required in development
- **Lightning Fast HMR**: Hot Module Replacement that stays fast
- **Optimized Builds**: Rollup-based production builds
- **TypeScript Support**: First-class TypeScript support out of the box
- **Modern JavaScript**: ES modules and modern browser features

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ⚡ Vite.js and ❤️ for HappyDeel**