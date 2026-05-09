# BMI Career Portal - Setup Guide

## Quick Start (5 menit)

### 1️⃣ Install & Run
```bash
# Install dependencies
pnpm install

# Setup environment (optional, default sudah ada)
cp .env.example .env.local

# Run development server
pnpm dev
```

Visit **http://localhost:3000** ✨

### 2️⃣ Connect to Laravel Backend

Ubah `NEXT_PUBLIC_API_URL` di `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-laravel-api.com/api
```

Restart dev server.

---

## 📋 Pre-requisites

- Node.js 18+ 
- pnpm (recommended) atau npm
- Laravel backend (untuk Phase 2+)

---

## 🏗️ Project Overview

### Apa yang sudah dibangun?

✅ **Landing Page Premium**
- Hero section dengan animations
- Job search & filters
- Lowongan pekerjaan dinamis
- About company section
- Career paths showcase
- Employee testimonials
- News & articles section
- Responsive footer

✅ **Design System**
- Corporate navy & blue theme
- Smooth animations (Framer Motion)
- Mobile-first responsive
- Professional typography
- Accessible components

✅ **API Ready**
- Axios client setup
- Mock data fallbacks
- Error handling
- API endpoints configured

---

## 🔧 Configuration

### Environment Variables
```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Optional
NEXT_PUBLIC_APP_NAME=BMI Career Portal
```

### Color Customization
Edit `app/globals.css` - CSS custom properties:
```css
:root {
  --primary: 15 23 42;        /* Navy */
  --secondary: 37 99 235;     /* Blue */
  --accent: 6 182 212;        /* Teal */
  /* ... */
}
```

---

## 📁 Key Files

| File | Tujuan |
|------|--------|
| `app/page.tsx` | Main landing page |
| `app/layout.tsx` | Root layout + metadata |
| `components/sections/*` | Section components |
| `components/layout/*` | Navigation, footer, banner |
| `lib/api.ts` | API client configuration |
| `tailwind.config.ts` | Tailwind settings |

---

## 🎯 Common Tasks

### Menambah Section Baru
1. Create file di `components/sections/my-section.tsx`
2. Import & use di `app/page.tsx`
3. Style dengan Tailwind + Framer Motion

### Mengubah Colors
Edit color tokens di `app/globals.css`:
```css
:root {
  --secondary: 59 130 246; /* New blue */
}
```

### Menambah Navigation Link
Edit `components/layout/navbar.tsx`:
```tsx
const navItems = [
  // ... existing
  { label: 'Baru', href: '#section-baru' }
]
```

### Fetch Data dari API
```tsx
const [data, setData] = useState([])

useEffect(() => {
  jobsAPI.getAll().then(res => setData(res.data.data))
}, [])
```

---

## 🚀 Deployment

### Build for Production
```bash
pnpm build
pnpm start
```

### Deploy ke Vercel
```bash
pnpm install -g vercel
vercel
```

---

## 🐛 Troubleshooting

### Build Error: Module not found
```bash
# Clear cache dan reinstall
rm -rf .next node_modules
pnpm install
pnpm build
```

### Dev Server not starting
```bash
# Kill process
lsof -ti:3000 | xargs kill -9

# Start ulang
pnpm dev
```

### API not working
1. Check `NEXT_PUBLIC_API_URL` di `.env.local`
2. Verify Laravel API running
3. Check CORS headers di Laravel
4. Open browser dev console (F12) untuk error details

---

## 📱 Mobile Testing

Test di mobile dengan:
```bash
# Network address untuk test di smartphone
http://<your-ip>:3000
```

Atau gunakan Chrome DevTools responsive mode (F12 → Toggle device toolbar)

---

## 🎨 Design System Preview

**Colors**:
- Navy: `#0F172A` (Primary)
- Blue: `#2563EB` (Secondary)  
- Teal: `#06B6D4` (Accent)
- Gray: `#6B7280` (Muted text)

**Spacing Scale**: 4px, 8px, 12px, 16px, 20px, 24px...

**Typography**:
- Headings: Bold, sizes 3xl-7xl
- Body: Regular, size base-lg
- Line height: 1.4-1.6

---

## 📊 Performance Tips

- ✅ Images optimized dengan Next.js Image
- ✅ Components lazy loaded
- ✅ Tailwind CSS purged
- ✅ Framer Motion optimized

---

## 🤝 Next Steps

### Phase 1 ✅ DONE
- Landing page complete
- UI/UX 80%+ done
- API integration ready

### Phase 2 TODO
- Authentication system
- HRD Dashboard
- Applicant dashboard
- Job application workflow

### Phase 3 TODO
- Email notifications
- Interview management
- Admin panel
- Analytics

---

## 💡 Tips

1. **Use TypeScript** - Type everything untuk safety
2. **Mobile-first** - Design mobile dulu, enhance desktop
3. **Reusable components** - Extract patterns untuk reusability
4. **Semantic HTML** - Use proper HTML elements
5. **Accessibility** - Test dengan screen readers

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

## ❓ FAQ

**Q: Bagaimana menambah halaman baru?**
A: Create file di `app/[slug]/page.tsx` - Next.js auto-route

**Q: Bisa ganti font?**
A: Edit `app/layout.tsx` - import dari Google Fonts

**Q: Bagaimana testing?**
A: Install Jest/Playwright - planning untuk Phase 2

**Q: Bisa dark mode?**
A: Tailwind `darkMode: 'class'` - sudah configured

---

## 🎉 Selesai!

Sekarang Anda punya premium career portal yang siap untuk:
- ✅ Public landing page
- ✅ Job search & listings
- ✅ Mobile responsive
- ✅ Fast & optimized
- ✅ Beautiful animations
- ✅ API ready

Enjoy! 🚀
