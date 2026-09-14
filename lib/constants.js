/**
 * NovaCart Application Constants
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */

export const APP_NAME = "NovaCart";
export const APP_DESCRIPTION = "Multi-Vendor E-Commerce Platform";
export const AUTHOR_NAME = "Gulshan Kumar";
export const AUTHOR_COLLEGE = "IIIT Ranchi";

export const APP_ROUTES = {
    HOME: '/',
    SHOP: '/shop',
    CART: '/cart',
    ORDERS: '/orders',
    PRICING: '/pricing',
    CREATE_STORE: '/create-store',
    STORE_DASHBOARD: '/store',
    STORE_ADD_PRODUCT: '/store/add-product',
    STORE_MANAGE_PRODUCT: '/store/manage-product',
    ADMIN_DASHBOARD: '/admin',
    ADMIN_COUPONS: '/admin/coupons',
    ADMIN_STORES: '/admin/stores',
    ADMIN_APPROVE: '/admin/approve',
};

export const ORDER_STATUS = {
    ORDER_PLACED: { label: 'Order Placed', color: 'amber' },
    PROCESSING: { label: 'Processing', color: 'indigo' },
    SHIPPED: { label: 'In Transit', color: 'blue' },
    DELIVERED: { label: 'Delivered', color: 'emerald' },
};

export const PAYMENT_METHODS = {
    COD: { id: 'COD', name: 'Cash on Delivery', description: 'Pay with cash upon package delivery' },
    STRIPE: { id: 'STRIPE', name: 'Stripe Online Payment', description: 'Instant card and wallet checkout' },
};

export const STORAGE_KEYS = {
    CART: 'novacart_cart_items',
    ORDERS: 'novacart_orders_history',
    USER_ROLE: 'novacart_active_role',
};

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 48,
};

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const TAX_RATE_PERCENTAGE = 0.0;

export const TOAST_OPTIONS = {
    duration: 3000,
    style: {
        background: '#0f172a',
        color: '#ffffff',
        borderRadius: '12px',
        fontSize: '13px',
    }
};
