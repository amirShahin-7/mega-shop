# 🛒 MegaShop - Premium E-Commerce Experience

MegaShop is a state-of-the-art, high-performance e-commerce platform built with **Next.js 16**, **Tailwind CSS 4**, and **Framer Motion**. It features a premium, glassmorphic design system with smooth, fluid animations and a global search experience.

---

## ✨ Key Features

### 🎨 Premium UI/UX

- **Glassmorphic Design**: A modern, clean aesthetic with subtle blurs, gradients, and professional typography.
- **Scroll-Driven Reveal**: All major sections and cards smoothly animate into view as you scroll, powered by a custom `ScrollReveal` component.
- **Seamless Auth Flow**: A dedicated, animated authentication section with dynamic content and fluid form transitions.

### 🔍 Global Search Overlay

- **Command Palette Style**: Access search anywhere using `CMD+K` or `CTRL+K`.
- **Hybrid Search**: Real-time filtering by keyword or price range (e.g., type "500" for products under 500 EGP).
- **Staggered Results**: Search results appear with individual entrance animations for a polished, high-end feel.

### 🛍️ Complete Shopping Journey

- **Dynamic Product Details**: Professional image galleries, interactive info cards, and related product carousels.
- **Category & Brand Exploration**: Fully animated lists for categories and brands with responsive grid layouts.
- **Modular Profile**: A structured user area for settings, orders, and addresses.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Auth**: [Next-Auth](https://next-auth.js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Communication**: [EmailJS](https://www.emailjs.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)

---

## 📁 Project Structure & Routes

### Source Organization

```text
src/
├── app/             # Next.js App Router (Pages & API)
├── components/      # Reusable UI components
│   ├── animations/  # Custom Framer Motion wrappers
│   ├── auth/        # Login, Register, Forgot Password
│   ├── home/        # Homepage specific sections
│   ├── Navbar/      # Global Nav & Search Overlay
│   └── ui/          # Radix-based base components
├── context/         # React Context (Cart, Auth, Favorites)
├── helpers/         # Utility functions & Middlewares
├── interfaces/      # TypeScript definitions
├── schemas/         # Zod validation schemas
└── server/          # Server Actions & API integration
```

### Build Routes Summary

```text
Route (app)                   Revalidate  Expire
┌ ○ /                                30m      1y
├ ○ /_not-found
├ ○ /about
├ ○ /allorders
├ ƒ /api/auth/[...nextauth]
├ ○ /brands
├ ƒ /brands/[brandId]
├ ○ /cart
├ ○ /categories
├ ƒ /categories/[categoryId]
├ ○ /checkout
├ ○ /contact
├ ○ /forgot-password
├ ○ /login
├ ○ /privacy
├ ○ /products                         1h      1y
├ ƒ /products/[productId]
├ ○ /profile
├ ƒ /profile/addresses
├ ○ /profile/favorites
├ ƒ /profile/orders
├ ○ /profile/settings
├ ○ /register
├ ○ /reset-password
├ ○ /terms
└ ○ /verify-code

ƒ Proxy (Middleware)
○ (Static)   prerendered as static content
ƒ (Dynamic)  server-rendered on demand
```

---

## 🎨 Design Philosophy

MegaShop is built to **"WOW"** the user. Every interaction—from a simple hover to a complex page transition—is designed to feel intentional, premium, and responsive. We prioritize **Visual Excellence** and seamless user journeys without compromising on technical performance.

---

### **Made with ❤️ by Amir Shahin**
