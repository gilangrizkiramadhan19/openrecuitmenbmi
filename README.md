# BMI Career Portal - Phase 1

Premium corporate career portal website untuk PT Bumi Menara Internusa. Website modern, responsif, dan profesional dengan fokus pada user experience yang excellent.

## 🎯 Fitur Phase 1

### ✨ Sections
- **Top Banner**: Alert bar informatif di bagian atas
- **Navigation Bar**: Sticky navigation dengan menu responsif
- **Hero Section**: Premium landing dengan animated statistics dan CTA
- **Job Search**: Smart filter dengan location, division, experience level
- **Job Listings**: Dynamic job cards dengan infinite scroll/pagination
- **About BMI**: Tentang perusahaan dengan company values
- **Career Paths**: 4 jalur karir dengan card yang menarik
- **Company Culture**: Gallery aktivitas dan budaya kerja
- **Testimonials**: Carousel dengan employee stories
- **Articles/News**: Blog section dengan featured articles
- **Final CTA**: Call-to-action section yang powerful
- **Footer**: Corporate footer dengan links dan contact info

### 🎨 Design Features
- Corporate navy & blue color scheme
- Smooth animations dengan Framer Motion
- Responsive mobile-first design
- Professional typography dan spacing
- Hover effects dan interactive elements
- Loading states dan empty states
- Glassmorphism subtle accents

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4.2
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Icons**: Lucide React

## 📦 Project Structure

```
app/
├── page.tsx              # Main landing page
├── layout.tsx            # Root layout with metadata
└── globals.css           # Global styles & design tokens

components/
├── layout/
│   ├── top-banner.tsx    # Warning banner
│   ├── navbar.tsx        # Navigation header
│   └── footer.tsx        # Corporate footer
└── sections/
    ├── hero.tsx          # Hero section
    ├── job-search.tsx    # Search & filters
    ├── job-listings.tsx  # Job cards display
    ├── about-bmi.tsx     # Company info
    ├── career-paths.tsx  # Career categories
    ├── company-culture.tsx # Gallery & values
    ├── testimonials.tsx  # Employee stories
    ├── articles.tsx      # News/blog
    └── cta-final.tsx     # Final call-to-action

lib/
├── api.ts               # Axios instance & API endpoints
└── constants.ts         # Colors, strings, company info

tailwind.config.ts       # Tailwind configuration
package.json             # Dependencies
```

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=BMI Career Portal
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the website.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

## 🔌 API Integration

Website menggunakan Axios untuk komunikasi dengan Laravel backend. Endpoints yang diharapkan:

### Job Endpoints
- `GET /api/jobs` - Get all jobs dengan filters
- `GET /api/jobs/{id}` - Get job detail
- `GET /api/locations` - Get all locations
- `GET /api/divisions` - Get all divisions
- `GET /api/experience-levels` - Get experience levels

### Content Endpoints
- `GET /api/testimonials` - Get employee testimonials
- `GET /api/articles` - Get articles/news

### Response Format
```json
{
  "data": [
    {
      "id": 1,
      "title": "...",
      // ... data fields
    }
  ]
}
```

## 🎨 Design System

### Colors
- **Primary**: `#0F172A` (Corporate Navy)
- **Secondary**: `#2563EB` (Premium Blue)
- **Accent**: `#06B6D4` (Teal)
- **Background**: `#FFFFFF`
- **Muted**: `#F3F4F6`
- **Border**: `#E5E7EB`

### Typography
- **Headings**: Bold, large sizes (Inter/Geist)
- **Body**: Clean, readable (Inter/Geist)
- **Line Height**: 1.4-1.6

### Spacing
- Consistent Tailwind spacing scale (4px, 8px, 16px, etc)
- Use `gap` classes for flex containers
- Use `p-` and `m-` for padding/margin

## 🔄 Component Structure

Semua components menggunakan:
- **Client-side rendering** dengan `'use client'` directive
- **Framer Motion** untuk smooth animations
- **Responsive design** dengan Tailwind breakpoints
- **Type safety** dengan TypeScript interfaces
- **Error handling** dengan fallback data

### Animation Patterns
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## 📱 Responsive Breakpoints

- Mobile: Default (< 640px)
- Tablet: `sm:` (640px)
- Desktop: `md:` (768px), `lg:` (1024px)
- Large: `xl:` (1280px)

## 🧪 Testing

Component testing belum diimplementasikan di Phase 1. Rencanakan untuk Phase 2.

## 📝 Phase 2 - Roadmap

- [ ] Authentication (Login/Register)
- [ ] HRD Dashboard
- [ ] Applicant Dashboard
- [ ] Job Application Workflow
- [ ] Email Notifications
- [ ] Interview Management
- [ ] CV Upload & Management
- [ ] Admin Panel
- [ ] Analytics & Reporting
- [ ] Unit Testing
- [ ] E2E Testing

## 🤝 Contributing

Guidelines untuk development:

1. Gunakan meaningful commit messages
2. Follow TypeScript best practices
3. Maintain consistent styling
4. Add comments untuk complex logic
5. Test sebelum push

## 📄 License

Proprietary - PT Bumi Menara Internusa

## 👥 Contact

- **Email**: hr@bmi.com
- **Phone**: +62 (21) 2345-678
- **Address**: Jakarta, Indonesia

## 🎉 Phase 1 Completion Status

✅ **80%+ UI Completion**
- [x] All 13 major sections built
- [x] Responsive mobile & desktop
- [x] Smooth animations
- [x] Loading & error states
- [x] API integration ready
- [x] Professional styling
- [x] TypeScript implementation
- [x] Optimized performance

🚀 **Ready for Phase 2**: Backend integration, Authentication, Dashboard development.
