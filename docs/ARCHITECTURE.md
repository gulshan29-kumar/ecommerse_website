# NovaCart Architecture Overview

NovaCart is architected around Next.js 15 App Router with full client-side state persistence and scalable multi-vendor segregation.

## Layers
1. **Presentation Layer**: Next.js 15 App Router (`app/`), Tailwind CSS v4, Lucide Icons.
2. **State Management**: Redux Toolkit slices (`lib/features/`) for cart, products, orders, addresses, and ratings.
3. **Domain Entities**: Products, Stores, Orders, Coupons, Users, Addresses.

- Priority image flags applied to Hero assets to improve LCP (Largest Contentful Paint).

- Product ratings computed once per item array update.

- Sorting comparator handles price ascending, price descending, and customer rating sort orders.

## License
NovaCart is released under the MIT License. Copyright (c) 2026 Gulshan Kumar (IIIT Ranchi).
