/**
 * NovaCart Utility Library
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */

export function formatCurrency(amount, symbol = '$') {
    const num = Number(amount) || 0;
    return `${symbol}${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function calculateDiscountPercentage(mrp, price) {
    if (!mrp || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
}

export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

export function truncateText(str, maxLength = 80) {
    if (!str || str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
}

export function sanitizeSearchQuery(query) {
    return (query || '').trim().replace(/[^a-zA-Z0-9\s-_]/g, '');
}

export function formatDate(dateString) {
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return dateString;
    }
}

export function generateOrderId() {
    return 'ord_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

export function clampNumber(value, min = 1, max = 99) {
    return Math.min(Math.max(value, min), max);
}
