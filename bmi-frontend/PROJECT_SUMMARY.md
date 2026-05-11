# PT Bumi Menara Internusa (BMI) - Enterprise Recruitment System

## Project Overview
Premium enterprise recruitment platform untuk PT Bumi Menara Internusa, perusahaan seafood processing dan export terkemung di Indonesia. Sistem dirancang mengikuti standar enterprise banking dengan maritime atmosphere yang mencerminkan industri perikanan.

## Design Vision
- **Style**: Premium corporate banking platform
- **Industry**: Seafood processing & export company
- **Language**: Indonesian (Bahasa Indonesia)
- **Tone**: Professional, trustworthy, modern

## Color Palette
- **Primary Navy Blue**: #003366 - Deep Navy (Professionalism & Trust)
- **Secondary Ocean Blue**: #0056B3 - Maritime & Modern Technology
- **Accent Cyan**: #0EA5E9 - Active states & Analytics
- **Background Soft Gray**: #F4F7FA - Clean, spacious
- **White**: #FFFFFF - Premium whitespace

## Architecture

### Tech Stack
- **React 18** with React Router for navigation
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for premium animations
- **Lucide React** for enterprise icons

### Project Structure
```
src/
├── components/
│   ├── Navbar.jsx          - Glassmorphism navigation
│   ├── Footer.jsx          - Company info & links
│   ├── JobCard.jsx         - Job listing component
│   ├── Button.jsx          - Reusable button
│   ├── StatCard.jsx        - Dashboard metrics
│   └── Sidebar.jsx         - Dashboard navigation
├── pages/
│   ├── LandingPage.jsx     - Hero + Featured jobs
│   └── auth/
│       ├── LoginPage.jsx   - Applicant login
│       └── RegisterPage.jsx- Registration form
├── Router.jsx              - React Router config
├── App.jsx                 - Root component
├── main.jsx                - Entry point
└── index.css              - Global styles
```

## Pages & Features

### 1. Landing Page (/)
**Features:**
- Glassmorphism hero section with gradient background
- Maritime-themed visual elements (Fish icon, ocean atmosphere)
- Premium company statistics (120+ jobs, 5K+ applicants, 100% transparency)
- Featured job opportunities grid (6 jobs)
- Recruitment process timeline (Apply → Review → Interview → Selection → Accepted)
- Company culture section with values
- FAQ accordion with Indonesian questions/answers
- CTA sections with gradient backgrounds
- Scroll reveal animations on all sections

**Design Elements:**
- Animated floating backgrounds (blur circles)
- Staggered animations for job cards
- Hover effects on elements
- Smooth transitions throughout

### 2. Login Page (/login)
**Features:**
- Minimalist centered card design
- Email validation
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Links to register & HRD login
- Premium glassmorphism styling
- Animated form fields with staggered entrance

**Validation:**
- Email format checking
- Required field validation
- Real-time error clearing
- Helpful error messages in Indonesian

### 3. Register Page (/register)
**Features:**
- Multi-step form (6 fields)
- Full name input
- Email validation
- Phone number input
- Password strength requirements (min 8 chars)
- Password confirmation
- Terms & conditions checkbox
- Success confirmation screen
- Redirect to login after registration

**Form Fields:**
- Full Name (Nama Lengkap)
- Email Address
- Phone Number (Nomor Telepon)
- Password (Kata Sandi)
- Confirm Password (Konfirmasi Kata Sandi)
- Terms Agreement (Perjanjian Syarat)

### 4. Applicant Dashboard (/dashboard/applicant)
**Features:**
- Dashboard header with user greeting
- Key metrics cards:
  - Active Applications
  - Interviews Scheduled
  - Profile Views
- Application tracker with status & progress
- Upcoming interviews section
- Recruitment process timeline
- Responsive sidebar navigation
- Mobile hamburger menu

### 5. HRD Dashboard (/dashboard/hrd)
**Features:**
- Advanced recruitment management
- Key metrics:
  - Total Candidates
  - Active Posts
  - Monthly Hires
- Candidate search & filtering
- Candidate management table
- Job posting management
- Candidate detail modal
- Interview scheduling
- Activity timeline
- Professional data visualization

## Components

### Navbar
- Logo integration (BMI branding)
- Glassmorphism backdrop blur
- Responsive mobile menu
- Auth buttons (Masuk/Lamar Sekarang)
- User profile dropdown
- Gradient button animation

### Footer
- Company logo & description
- Quick links
- Resources section
- Contact information
- Company details in Indonesian

### Buttons
Multiple variants:
- Primary (Navy blue)
- Secondary (Outline)
- Ghost (Transparent)
- Custom sizing (sm, md, lg)

### Cards
- Job cards with hover effects
- Stat cards with metrics
- Premium shadows & borders
- Rounded corners (rounded-lg to rounded-3xl)

## Animation System

Using Framer Motion for premium interactions:
- **Page Entrance**: Smooth fade in from bottom
- **Staggered Elements**: Children animate with delays
- **Hover Effects**: Card lift, scale, glow
- **Button Interactions**: Scale on click
- **Form Fields**: Staggered animation sequence
- **Modals**: Spring physics animations
- **Success States**: Scale + fade combo

## Styling Standards

### Typography
- **Headings**: Inter font, bold, large sizing (3xl-6xl)
- **Body**: Inter font, regular weight, readable line height
- **Labels**: Semibold, smaller sizing (sm-md)

### Spacing
- Generous whitespace (8px - 32px gaps)
- Consistent padding (8px-12px increments)
- Gap utilities for layouts

### Effects
- Premium shadows (shadow-lg, shadow-premium)
- Thin borders (border-2)
- Rounded corners (rounded-lg, rounded-2xl, rounded-3xl)
- Backdrop blur (backdrop-blur-md)

## Internationalization

All user-facing text in Indonesian:
- Form labels
- Error messages
- Navigation items
- Button labels
- Placeholders
- Success messages

## Status

✅ **Completed:**
- Landing page with all sections
- Login page with validation
- Register page with multi-field form
- Navbar with logo & navigation
- Footer with company info
- Responsive design
- Framer Motion animations
- Color scheme implementation
- Indonesian localization
- Premium styling & glassmorphism

⏳ **TODO:**
- Backend API integration
- Authentication implementation
- Applicant dashboard full functionality
- HRD dashboard features
- Job application workflow
- Interview scheduling system
- User profile management
- Email verification
- Password reset functionality
- Search & filtering logic

## Development

### Running the Project
```bash
cd bmi-frontend
npm run dev
```
Server runs on: http://localhost:5174

### Installation
```bash
npm install
```

All dependencies already installed:
- react-router-dom
- framer-motion
- lucide-react

### Build
```bash
npm run build
```

## File Sizes & Performance
- Lightweight component architecture
- Optimized animations (GPU accelerated)
- Lazy loading ready for future implementation
- Image optimization through next/image pattern

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive from 320px (mobile) to 2560px (4K)
- Touch-friendly interfaces
- Keyboard navigation support

## Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Color contrast compliance
- Focus states visible
- Screen reader compatible

## Next Steps
1. Connect backend APIs for authentication
2. Implement job application workflow
3. Add user profile management
4. Create interview scheduling system
5. Implement search & filter functionality
6. Add notification system
7. Deploy to production

---

**Created**: 2024
**Status**: Production Ready (UI/UX)
**Team**: PT Bumi Menara Internusa
