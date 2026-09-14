# API Reference Specification

Planned and integrated backend endpoints for multi-vendor operations:

## Products
- `GET /api/products`: Retrieve all active products with pagination & search.
- `POST /api/products`: Vendor inventory submission.
- `DELETE /api/products/:id`: Remove product from catalog.

## Orders
- `GET /api/orders`: Retrieve authenticated user orders.
- `POST /api/orders`: Place new order.
