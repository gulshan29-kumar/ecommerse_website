/**
 * Shop Page Component
 * Supports full-text search, category filtering, and multi-mode sorting.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { Suspense, useState, useMemo } from "react"
import ProductCard from "@/components/ProductCard"
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import { categories } from "@/assets/assets"

function ShopContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const initialSearch = searchParams.get('search') || ''
    const initialCategory = searchParams.get('category') || ''

    const [searchInput, setSearchInput] = useState(initialSearch)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [sortBy, setSortBy] = useState('featured') // featured, price-low, price-high, rating

    const products = useSelector(state => state.product.list)

    const handleCategoryClick = (cat) => {
        if (selectedCategory === cat) {
            setSelectedCategory('')
            router.push('/shop')
        } else {
            setSelectedCategory(cat)
            router.push(`/shop?category=${encodeURIComponent(cat)}`)
        }
    }

    const clearFilters = () => {
        setSearchInput('')
        setSelectedCategory('')
        setSortBy('featured')
        router.push('/shop')
    }

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                const matchesSearch = searchInput
                    ? product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                      product.category.toLowerCase().includes(searchInput.toLowerCase())
                    : true;
                const matchesCategory = selectedCategory
                    ? product.category.toLowerCase() === selectedCategory.toLowerCase()
                    : true;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === 'price-low') return a.price - b.price;
                if (sortBy === 'price-high') return b.price - a.price;
                if (sortBy === 'rating') {
                    const ratingA = a.rating?.length ? a.rating.reduce((sum, r) => sum + r.rating, 0) / a.rating.length : 0;
                    const ratingB = b.rating?.length ? b.rating.reduce((sum, r) => sum + r.rating, 0) / b.rating.length : 0;
                    return ratingB - ratingA;
                }
                return 0;
            });
    }, [products, searchInput, selectedCategory, sortBy]);

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header / Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        Explore <span className="text-emerald-600">Catalog</span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full ml-1">
                            {filteredProducts.length} items
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Find premium gadgets, electronics, and smart tech with verified quality and instant delivery.
                    </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 shadow-xs">
                        <ArrowUpDown size={14} className="text-slate-400" />
                        <span>Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer font-semibold text-slate-900"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Customer Rated</option>
                        </select>
                    </div>

                    {(searchInput || selectedCategory || sortBy !== 'featured') && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl transition"
                        >
                            <X size={14} /> Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
                <button
                    onClick={() => handleCategoryClick('')}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        !selectedCategory
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    All Categories
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                            selectedCategory.toLowerCase() === cat.toLowerCase()
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Active filters indicators */}
            {(searchInput || selectedCategory) && (
                <div className="flex items-center gap-2 pb-4 text-xs text-slate-500">
                    <span>Filtering by:</span>
                    {selectedCategory && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                            Category: {selectedCategory}
                            <X size={12} className="cursor-pointer hover:text-emerald-900" onClick={() => setSelectedCategory('')} />
                        </span>
                    )}
                    {searchInput && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full font-medium">
                            Search: &ldquo;{searchInput}&rdquo;
                            <X size={12} className="cursor-pointer hover:text-slate-900" onClick={() => setSearchInput('')} />
                        </span>
                    )}
                </div>
            )}

            {/* Product Grid or Empty State */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6 mb-24">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 my-8">
                    <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                        <SlidersHorizontal size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No products found</h3>
                    <p className="text-sm text-slate-500 max-w-sm mt-1 mb-5">
                        We couldn&apos;t find any items matching your current filters. Try changing your search keywords or resetting filters.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full shadow-sm transition"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}
        </div>
    )
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-slate-500">Loading catalog...</div>}>
            <ShopContent />
        </Suspense>
    )
}