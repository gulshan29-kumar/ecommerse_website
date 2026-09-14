# Component Hierarchy

- **Layout Components**:
  - `Navbar`: Sticky glass navigation, search, cart, and role modal.
  - `Footer`: Categorized links and author attribution.
  - `Banner`: Promotional flash announcement bar.
- **Storefront Components**:
  - `Hero`: Primary banner with dual product highlight cards.
  - `CategoriesMarquee`: Dynamic marquee pills filtering `/shop`.
  - `ProductCard`: Grid card with rating, discount, quick-add, and wishlist.
- **Checkout Components**:
  - `OrderSummary`: Subtotal, shipping, coupon verification, and order placement.
  - `AddressModal`: Interactive shipping address creation modal.

### Navbar Roles
- Customer (shopper persona)
- Vendor (store owner)
- Admin (platform management)

- Esc key and click outside close the mobile menu and modal dialogs.

- CategoriesMarquee uses quadruple concat array for continuous smooth scrolling.

- High contrast emerald color (#10b981) for filled stars with slate-200 for empty stars.

- Coupon engine supports both percentage discounts and member eligibility.

- Selected address card shows user name, street, city, state, zip and contact number.

- Enter key automatically triggers coupon evaluation in OrderSummary.

- Mobile view adapts into compact cards with inline status indicators.

- AddressModal validates presence of name, phone, city, state, and zip code.

- Footer palette uses slate-500 for secondary text and slate-800 for category headings.

- Empty cart state displays a clear heading and direct CTA to explore products.

- Active search badge shows keyword and allows instant dismissal.

- Reset filters button clears both category and keyword filters seamlessly.

- Empty orders view displays link to return to shop catalog.

- Inventory management table formatted with consistent 16px cell padding.

- Admin coupons table renders expiration dates in formatted MMM dd, yyyy format.
