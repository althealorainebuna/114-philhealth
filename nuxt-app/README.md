# PhilHealth Online Services Portal

A modern, accessible Vue 3/Nuxt 4 application for PhilHealth members to access online services. Built with full WCAG 2.x Level AA compliance and integrated accessibility features.

## 🌟 Features

### Pages
- **Online Services** - Searchable service directory with category filtering
- **Login** - Secure member authentication with CAPTCHA
- **Register** - New member registration with inline validation

### Accessibility Features (WCAG 2.x AA Compliant)
✅ **High Contrast Mode** - Enhanced visibility for low-vision users  
✅ **Text Size Adjustment** - 3 levels (Normal, Large, Extra Large)  
✅ **Voice Navigation** - Voice commands for hands-free navigation  
✅ **Keyboard Navigation** - Full keyboard support with visible focus indicators  
✅ **Screen Reader Support** - Semantic HTML with ARIA labels  
✅ **Skip Links** - Quick navigation to main content  
✅ **Reduced Motion** - Respects `prefers-reduced-motion`  
✅ **Color Contrast** - Minimum 4.5:1 ratio on all text  

### Design System
- **Primary Color**: PhilHealth Green (#007A3D)
- **Accent Color**: Government Blue (#0056B3)
- **Typography**: Inter font family
- **Components**: Reusable, accessible UI components
- **Responsive**: Mobile-first design

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+ or yarn 1.22+

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd nuxt-app
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

### 5. Generate Static Site

```bash
npm run generate
```

## 📁 Project Structure

```
nuxt-app/
├── assets/
│   └── css/
│       └── main.css              # Global styles + Tailwind
├── components/
│   ├── AccessibilityMenu.vue     # Floating accessibility controls
│   ├── ServiceCard.vue           # Service display card
│   └── SkipLink.vue              # Keyboard navigation helper
├── composables/
│   └── useAccessibility.ts       # Accessibility helper functions
├── pages/
│   ├── index.vue                 # Services directory page
│   ├── login.vue                 # Member login page
│   └── register.vue              # Member registration page
├── stores/
│   ├── auth.ts                   # Authentication state management
│   └── services.ts               # Services data & filtering
├── public/
│   └── favicon.svg               # Site icon
├── app.vue                       # Root component
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎨 Component Library

### Reusable Components

#### `<SkipLink />`
Allows keyboard users to skip to main content.

#### `<ServiceCard :service="service" />`
Displays service information with accessibility features.
- Props: `service` (Service object)
- Features: Tooltips, badges, keyboard navigation

#### `<AccessibilityMenu />`
Floating menu with accessibility controls.
- High contrast toggle
- Text size cycling
- Voice navigation toggle
- Keyboard shortcuts help

## 🔐 Authentication

### Demo Credentials (Login Page)
- **Username**: `demo`
- **Password**: `password123`
- **CAPTCHA**: Any 3+ characters

### Registration Validation
- PhilHealth ID format: `XX-XXXXXXXXX-X`
- Password: Min 8 chars, must include uppercase, lowercase, number, special char
- Age: Minimum 18 years old
- Email: Valid format required

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search box |
| `H` | Scroll to top |
| `Alt+1` | Jump to Membership |
| `Alt+2` | Jump to Contribution |
| `Alt+3` | Jump to Collection |
| `Alt+4` | Jump to Accreditation |
| `Alt+5` | Jump to Benefits |
| `Tab` | Navigate interactive elements |
| `Escape` | Close menus/tooltips |

## 🎤 Voice Commands

When voice navigation is enabled, say:
- "membership" - Navigate to Membership section
- "contribution" - Navigate to Contribution section
- "collection" - Navigate to Collection section
- "accreditation" - Navigate to Accreditation section
- "benefits" - Navigate to Benefits section
- "search" - Focus search box
- "top" - Scroll to top
- "help" - Show available commands

**Note**: Voice navigation requires microphone permission and Chrome/Edge browser.

## 🏗️ Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **State Management**: Pinia
- **Styling**: Tailwind CSS 3
- **TypeScript**: Full type safety
- **Composition API**: `<script setup>` syntax
- **Build Tool**: Vite

## 🎯 State Management

### Auth Store (`stores/auth.ts`)
- `user` - Current user data
- `token` - Authentication token
- `loading` - Request loading state
- `error` - Error messages
- Actions: `login()`, `register()`, `logout()`, `restoreSession()`

### Services Store (`stores/services.ts`)
- `services` - All available services
- `searchQuery` - Current search filter
- `selectedCategory` - Active category filter
- Getters: `filteredServices`, `servicesByCategory`
- Actions: `setSearchQuery()`, `setSelectedCategory()`, `clearFilters()`

## 🌐 Browser Support

- Chrome/Edge (latest) - ✅ Full support including voice navigation
- Firefox (latest) - ✅ All features except voice navigation
- Safari (latest) - ✅ All features except voice navigation
- Mobile browsers - ✅ Responsive design, touch-optimized

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing Accessibility

### Manual Testing
1. **Keyboard Navigation**: Tab through entire page
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **High Contrast**: Toggle high contrast mode
4. **Text Size**: Cycle through text sizes
5. **Voice Commands**: Enable and test voice navigation
6. **Color Blindness**: Use browser extensions to simulate

### Automated Testing Tools
- WAVE Browser Extension
- axe DevTools
- Lighthouse Accessibility Audit

## 🔒 Security Considerations

- Client-side validation only (replace with backend API)
- Mock authentication (implement real JWT/OAuth)
- CAPTCHA is placeholder (use reCAPTCHA or hCaptcha)
- HTTPS required in production
- Sanitize all user inputs

## 📄 License

Government of the Philippines - PhilHealth

## 👥 Credits

Built with accessibility-first principles following WCAG 2.x Level AA guidelines.

## 📞 Support

For issues or questions:
- GitHub Issues: [Create an issue]
- Email: info@philhealth.gov.ph
- Phone: (02) 8441-7444

---

**Your Partner in Health** 💚
