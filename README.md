# 🛍️ NovaCart — Full-Stack Multi-Vendor E-Commerce Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE.md)

**Built & Maintained by [Gulshan Kumar](https://github.com/gulshan29-kumar)**  
*Indian Institute of Information Technology Ranchi (IIIT Ranchi)*

</div>

---

## 🌟 Overview

**NovaCart** is a modern, responsive, multi-vendor e-commerce platform developed with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **Redux Toolkit**. It provides an end-to-end shopping journey with role-based features for shoppers, multi-vendor store managers, and platform administrators.

---

## ✨ Key Features

### 🛒 Customer Experience
- **Interactive Storefront**: Dynamic hero banner with promotional offer claims, categorized marquee navigation, trending gadgets, and featured collections.
- **Smart Product Exploration**: Instant search filtering, category filtering (Headphones, Speakers, Smartwatches, Earbuds, Mice, Decor), price & rating sorting.
- **Product Details**: Multi-angle image preview galleries, expandable specifications, customer review & rating system.
- **Frictionless Cart & Checkout**:
  - Live item quantity adjustments and instant subtotal recalculation.
  - Multi-coupon validation engine (`NEW20` for 20% off, `NEW10`, `OFF20`, etc.).
  - Address book management with interactive modal creation.
  - Payment method selection (Cash on Delivery & Stripe simulation).
  - Real-time order placement with tracking in **My Orders**.
- **Role Switcher & Authentication Drawer**: Switch seamlessly between **Shopper**, **Vendor**, and **Admin** accounts directly from the navigation bar.

### 🏬 Multi-Vendor Portal (`/store`)
- Dedicated dashboard for vendors to view sales analytics, total earnings, active order queue, and buyer ratings.
- **Product Management**: Add new inventory with multi-image previews, pricing, categories, stock availability toggles, and catalog management.
- **Order Management**: Inspect vendor-specific orders and monitor shipping statuses.

### 🛡️ Platform Admin Suite (`/admin`)
- Platform-wide overview with revenue metrics, total orders, active vendor stores, and order volume area charts.
- **Store Approvals**: Review pending vendor applications, approve registrations, and activate/deactivate stores.
- **Coupon Engine**: Create new discount codes with expiration dates, target criteria (new users, Plus members), and live discount percentages.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend Library**: React 19
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Tailwind CSS v4 with custom glassmorphism, responsive grids, and animations
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Data Visualization**: Recharts & Date-fns

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gulshan29-kumar/ecommerse_website.git
   cd ecommerse_website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CURRENCY_SYMBOL=$
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧭 Application Routes

| Path | Description | Access |
|---|---|---|
| `/` | Homepage with hero, categories marquee, featured & best-selling products | Public |
| `/shop` | Product catalog with category pills, search, and sorting | Public |
| `/product/[productId]` | Detailed product preview, specifications, and rating modal | Public |
| `/cart` | Cart management, coupon application, and checkout summary | Public |
| `/orders` | Order history, tracking status, and delivery details | Customer |
| `/pricing` | Plus membership plans and benefits | Public |
| `/create-store` | Vendor registration form to open a new digital storefront | Public |
| `/store` | Vendor dashboard: earnings, analytics, and product catalog | Vendor |
| `/store/add-product` | Add new inventory items with images, pricing, and category | Vendor |
| `/admin` | Admin dashboard: platform revenue, store counts, and order trends | Admin |
| `/admin/coupons` | Add and manage platform promotional discount codes | Admin |
| `/admin/stores` | Monitor all active and registered multi-vendor stores | Admin |

---

## 👨‍💻 Author

**Gulshan Kumar**  
Student, Indian Institute of Information Technology Ranchi (IIIT Ranchi)  
- **GitHub**: [@gulshan29-kumar](https://github.com/gulshan29-kumar)  
- **Email**: [gulshankumar29082006@gmail.com](mailto:gulshankumar29082006@gmail.com)

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.md) — feel free to explore, learn, and build upon it!
