'use client'
import { StarIcon, ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const dispatch = useDispatch()
    const [isWishlisted, setIsWishlisted] = useState(false)

    // Calculate average rating
    const rating = product.rating && product.rating.length > 0
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 5;

    const discountPercentage = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : null;

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ productId: product.id }));
        toast.success(`Added ${product.name} to cart!`, {
            icon: '🛍️',
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px',
            }
        });
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        toast(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist!', {
            icon: isWishlisted ? '💔' : '❤️',
            style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px',
            }
        });
    };

    return (
        <div className='group relative flex flex-col justify-between bg-white border border-slate-200/80 hover:border-emerald-500/50 rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-xl transition-all duration-300 w-full sm:w-64'>
            {/* Wishlist button */}
            <button
                onClick={handleToggleWishlist}
                className={`absolute top-5 right-5 z-10 size-8 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted ? 'bg-red-50 text-red-500 shadow-sm' : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-white'
                }`}
                title="Save to wishlist"
            >
                <Heart size={16} className={isWishlisted ? 'fill-red-500' : ''} />
            </button>

            {/* Discount Badge */}
            {discountPercentage && (
                <span className='absolute top-5 left-5 z-10 text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full shadow-xs'>
                    {discountPercentage}% OFF
                </span>
            )}

            {/* Product Image Clickable Link */}
            <Link href={`/product/${product.id}`} className='block'>
                <div className='bg-slate-50/80 group-hover:bg-slate-100/70 h-44 sm:h-52 rounded-xl flex items-center justify-center p-4 transition-colors overflow-hidden'>
                    <Image
                        width={400}
                        height={400}
                        className='max-h-36 sm:max-h-44 w-auto object-contain group-hover:scale-110 transition duration-300'
                        src={product.images[0]}
                        alt={product.name}
                    />
                </div>
            </Link>

            {/* Content */}
            <div className='pt-3 flex flex-col justify-between flex-grow'>
                <div>
                    <span className='text-[11px] font-semibold tracking-wider text-slate-400 uppercase'>
                        {product.category}
                    </span>
                    <Link href={`/product/${product.id}`} className='block'>
                        <h3 className='text-sm font-semibold text-slate-800 hover:text-emerald-600 transition line-clamp-1 mt-0.5' title={product.name}>
                            {product.name}
                        </h3>
                    </Link>

                    {/* Star Rating */}
                    <div className='flex items-center gap-1.5 mt-1.5'>
                        <div className='flex'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon
                                    key={index}
                                    size={13}
                                    className='text-transparent'
                                    fill={rating >= index + 1 ? "#10b981" : "#e2e8f0"}
                                />
                            ))}
                        </div>
                        <span className='text-[11px] text-slate-400'>
                            ({product.rating ? product.rating.length : 1})
                        </span>
                    </div>
                </div>

                {/* Price and Action */}
                <div className='flex items-center justify-between mt-4 pt-2 border-t border-slate-100'>
                    <div>
                        <div className='flex items-baseline gap-1.5'>
                            <span className='text-base font-bold text-slate-900'>
                                {currency}{product.price}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                                <span className='text-xs text-slate-400 line-through'>
                                    {currency}{product.mrp}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleQuickAdd}
                        className='size-8 rounded-full bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white flex items-center justify-center transition active:scale-90 shadow-xs'
                        title="Add to cart"
                    >
                        <ShoppingBag size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard