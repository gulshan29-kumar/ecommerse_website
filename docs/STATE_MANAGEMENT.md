# State Management Flow

NovaCart utilizes Redux Toolkit to provide predictable, centralized state across the entire user journey.

## Slices
- `cartSlice`: Manages cart items, quantities, subtotal calculations, and cart clearance.
- `productSlice`: Holds product catalog, supports dynamic product creation and inventory management.
- `orderSlice`: Tracks customer orders, statuses (Placed, Processing, Shipped, Delivered).
- `addressSlice`: Stores user shipping addresses.
- `ratingSlice`: Stores customer reviews and star ratings.
