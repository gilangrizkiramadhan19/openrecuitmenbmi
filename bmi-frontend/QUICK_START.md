# 🚀 BMI Recruitment System - Quick Start Guide

## Preview URLs

The application is now running on **http://localhost:5174**

### Available Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero section, featured jobs, recruitment process, FAQ |
| `/login` | Login Page | Applicant login with email & password |
| `/register` | Register Page | New applicant registration form |
| `/dashboard/applicant` | Applicant Dashboard | View applications, interviews, progress tracking |
| `/dashboard/hrd` | HRD Dashboard | Manage candidates, job postings, recruitment analytics |

## Navigation Flow

```
Landing Page (/)
├── Navbar "Lamar Sekarang" → Register (/register)
├── Navbar "Masuk" → Login (/login)
├── Featured Jobs → Register (/register)
├── CTA Buttons → Register (/register)
└── Footer Links → (To be implemented)

Login Page (/login)
├── Login Form → Applicant Dashboard (/dashboard/applicant)
├── Register Link → Register (/register)
└── HRD Login Link → (HRD Login page)

Register Page (/register)
├── Registration Form → Success Screen → Login (/login)
└── Login Link → Login (/login)
```

## Key Features Implemented

### 🎨 Design
- ✅ Premium enterprise banking style UI
- ✅ Maritime industry atmosphere
- ✅ Navy Blue (#003366) & Ocean Blue (#0056B3) color scheme
- ✅ Glassmorphism navbar with backdrop blur
- ✅ Premium shadows & rounded corners
- ✅ Responsive design (mobile to desktop)

### 🎬 Animations
- ✅ Framer Motion staggered animations
- ✅ Scroll reveal effects
- ✅ Button hover interactions
- ✅ Form field entrances
- ✅ Success state animations
- ✅ Smooth page transitions

### 📝 Forms
- ✅ Login form with validation
- ✅ Registration form (6 fields)
- ✅ Password visibility toggle
- ✅ Real-time error clearing
- ✅ Email validation
- ✅ Indonesian error messages

### 🌐 Localization
- ✅ All text in Indonesian
- ✅ Indonesian date formats ready
- ✅ Indonesian labels & placeholders
- ✅ Indonesian error messages

### 📱 Responsive
- ✅ Mobile-first design
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Hamburger menu on mobile
- ✅ Touch-friendly buttons

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Navigation with logo
│   ├── Footer.jsx       # Company footer
│   ├── Button.jsx       # Button component
│   ├── JobCard.jsx      # Job listing card
│   ├── StatCard.jsx     # Metrics card
│   └── Sidebar.jsx      # Dashboard sidebar
├── pages/               # Page components
│   ├── LandingPage.jsx  # Home page
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   └── dashboard/
│       ├── ApplicantDashboard.jsx
│       └── HRDDashboard.jsx
├── Router.jsx           # Route configuration
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Customization

### Change Colors
Edit `/tailwind.config.js`:
```javascript
colors: {
  "bmi-navy": "#003366",      // Primary
  "bmi-blue": "#0056B3",      // Secondary
  "bmi-cyan": "#0EA5E9",      // Accent
  "bmi-soft": "#F4F7FA",      // Background
}
```

### Update Logo
Replace `/public/logo-bmi.png` with your logo and update sizes in components if needed.

### Modify Text/Content
All user-facing text is in components:
- Landing content: `src/pages/LandingPage.jsx`
- Login form: `src/pages/auth/LoginPage.jsx`
- Register form: `src/pages/auth/RegisterPage.jsx`

## Testing the Pages

### 1. Landing Page
Click on the logo or visit http://localhost:5174
- **Test animations**: Scroll down to see reveal effects
- **Test buttons**: Click "Lamar Sekarang" or "Masuk"
- **Test responsive**: Resize browser to test mobile menu

### 2. Login Page
Click "Masuk" button on navbar
- **Test validation**: Leave fields empty → See errors
- **Test password toggle**: Click eye icon
- **Test links**: Try "Lupa kata sandi?" and register link

### 3. Register Page
Click "Lamar Sekarang" or "Daftar sekarang" on login page
- **Test all fields**: Fill in form completely
- **Test password match**: Try mismatched passwords
- **Test success screen**: After clicking "Buat Akun"
- **Test validation**: Submit with missing fields

### 4. Dashboards
After login/register, you're redirected to `/dashboard/applicant`
- View mock dashboard layout
- See responsive sidebar
- Check data tables & cards

## Configuration

### Environment Variables
Create `.env` file in `bmi-frontend/` if needed:
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=BMI Recruitment
```

### Build Settings
Check `vite.config.js`:
```javascript
export default {
  server: {
    port: 5174,
    strictPort: false,
  },
}
```

## Common Tasks

### Add a New Page
1. Create file in `src/pages/`
2. Add route in `src/Router.jsx`
3. Import and add to Routes

### Add a New Component
1. Create file in `src/components/`
2. Import where needed
3. Use with props

### Change Button Style
Edit `src/components/Button.jsx` to modify variants or styling.

### Update Colors
Edit `tailwind.config.js` and update all color references in components.

## Troubleshooting

### Port Already in Use
If 5174 is in use:
```bash
# Kill the process or change port in vite.config.js
```

### Styles Not Updating
- Clear browser cache
- Restart dev server
- Check Tailwind class names

### Images Not Loading
- Ensure images are in `/public/` folder
- Check file paths start with `/`
- Verify file names match exactly

## Performance Tips

- Components are code-split ready
- Images can be lazy loaded
- Animations use GPU acceleration
- Minimal bundle size

## Next Steps

1. **API Integration**: Connect backend APIs
2. **Database**: Set up user database
3. **Authentication**: Implement JWT or session auth
4. **Jobs API**: Connect job listings
5. **Application Workflow**: Build application tracking
6. **Notifications**: Add real-time updates
7. **Search**: Implement job search

## Support

For issues or questions:
- Check project structure
- Review component props
- Test on different browsers
- Clear cache and reload

---

**Status**: ✅ Ready for Development
**Last Updated**: 2024
**Version**: 1.0.0
