/**
 * Navbar Component for NovaCart
 * Handles navigation, live search, cart counter, and role switcher.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { Search, ShoppingCart, Menu, X, User, Store, ShieldCheck, Sparkles, LogIn, ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [activeRole, setActiveRole] = useState('Customer'); // Customer, Vendor, Admin

    const cartCount = useSelector(state => state.cart.total);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 glass-nav transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Brand Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="relative text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 flex items-center group">
                            <span className="text-emerald-600 group-hover:scale-105 transition-transform inline-block">go</span>
                            <span>cart</span>
                            <span className="text-emerald-500 text-4xl leading-none">.</span>
                            <span className="ml-2 hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-full shadow-xs">
                                <Sparkles size={10} className="text-emerald-600" /> Plus
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
                        <Link href="/pricing" className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-emerald-600 font-semibold">
                            Plus Membership
                        </Link>
                        <Link href="/orders" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                            <Package size={16} /> My Orders
                        </Link>
                        <Link href="/store" className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-slate-500">
                            <Store size={15} /> Store Manager
                        </Link>
                        <Link href="/admin" className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-slate-500">
                            <ShieldCheck size={15} /> Admin
                        </Link>
                    </nav>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Desktop Search Bar */}
                        <form onSubmit={handleSearch} className="hidden md:flex items-center w-56 lg:w-72 text-sm gap-2 bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 border border-slate-200 px-3.5 py-2 rounded-full transition-all">
                            <Search size={16} className="text-slate-400" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-sm"
                                type="text"
                                placeholder="Search electronics, audio..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>

                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="relative flex items-center gap-2 text-slate-700 hover:text-emerald-600 bg-slate-100/80 hover:bg-slate-100 px-3.5 py-2 rounded-full text-sm font-medium transition"
                            title="View Cart"
                        >
                            <ShoppingCart size={18} />
                            <span className="hidden sm:inline">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold text-white bg-emerald-600 min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Role / Auth Switcher Button */}
                        <button
                            onClick={() => setShowRoleModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all"
                        >
                            <User size={16} />
                            <span className="hidden sm:inline">{activeRole}: Gulshan</span>
                            <span className="sm:hidden">Profile</span>
                            <ChevronDown size={14} />
                        </button>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                </div>

                {/* Mobile Search Row */}
                <div className="md:hidden pb-3">
                    <form onSubmit={handleSearch} className="flex items-center w-full text-sm gap-2 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-full">
                        <Search size={16} className="text-slate-400" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-sm"
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-5 shadow-lg">
                    <div className="flex flex-col gap-3 font-medium text-slate-700">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                        >
                            Browse Shop
                        </Link>
                        <Link
                            href="/pricing"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-700 transition"
                        >
                            ★ Plus Membership
                        </Link>
                        <Link
                            href="/orders"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
                        >
                            <Package size={18} /> My Orders
                        </Link>
                        <div className="border-t border-slate-100 my-2 pt-2">
                            <p className="text-xs uppercase text-slate-400 font-semibold px-3 mb-1">Portals</p>
                            <Link
                                href="/store"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 text-slate-600"
                            >
                                <Store size={18} /> Store Dashboard
                            </Link>
                            <Link
                                href="/admin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 text-slate-600"
                            >
                                <ShieldCheck size={18} /> Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Role / Auth Switcher Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
                        <button
                            onClick={() => setShowRoleModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="size-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-lg flex items-center justify-center shadow-md">
                                GK
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Gulshan Kumar</h3>
                                <p className="text-xs text-slate-500">Student • IIIT Ranchi (Indian Institute of Information Technology)</p>
                            </div>
                        </div>

                        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 mb-5 text-xs text-emerald-900 leading-relaxed">
                            💡 <strong>Multi-Role Platform Demo</strong>: Switch your active persona below to experience Shopper, Vendor Store Management, or Platform Administration suites.
                        </div>

                        <div className="space-y-2.5">
                            <button
                                onClick={() => { setActiveRole('Customer'); setShowRoleModal(false); router.push('/shop'); }}
                                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                                    activeRole === 'Customer'
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-medium ring-2 ring-emerald-500/20'
                                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Customer / Shopper</p>
                                        <p className="text-xs text-slate-500">Browse, add to cart, apply coupons, place orders</p>
                                    </div>
                                </div>
                                {activeRole === 'Customer' && <span className="text-xs text-emerald-600 font-bold">Active</span>}
                            </button>

                            <button
                                onClick={() => { setActiveRole('Vendor'); setShowRoleModal(false); router.push('/store'); }}
                                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                                    activeRole === 'Vendor'
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-medium ring-2 ring-emerald-500/20'
                                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                                        <Store size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Vendor Dashboard</p>
                                        <p className="text-xs text-slate-500">Manage products, view store sales & inventory</p>
                                    </div>
                                </div>
                                {activeRole === 'Vendor' && <span className="text-xs text-emerald-600 font-bold">Active</span>}
                            </button>

                            <button
                                onClick={() => { setActiveRole('Admin'); setShowRoleModal(false); router.push('/admin'); }}
                                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                                    activeRole === 'Admin'
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-medium ring-2 ring-emerald-500/20'
                                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Platform Administrator</p>
                                        <p className="text-xs text-slate-500">Manage coupons, approve stores, revenue analytics</p>
                                    </div>
                                </div>
                                {activeRole === 'Admin' && <span className="text-xs text-emerald-600 font-bold">Active</span>}
                            </button>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span>Logged in as: <strong className="text-slate-700">Gulshan Kumar</strong></span>
                            <button onClick={() => setShowRoleModal(false)} className="text-emerald-600 font-semibold hover:underline">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;