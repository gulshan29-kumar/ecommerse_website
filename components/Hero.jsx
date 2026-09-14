/**
 * Hero Component
 * Features promotional announcements, main hero model, and product banners.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <section className='mx-4 sm:mx-6'>
            <div className='flex max-xl:flex-col gap-6 max-w-7xl mx-auto my-8'>
                
                {/* Main Hero Card */}
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-emerald-100 via-teal-100 to-green-200 rounded-3xl xl:min-h-[420px] group overflow-hidden border border-emerald-200/60 shadow-xs'>
                    <div className='p-6 sm:p-14 z-10 max-w-lg'>
                        <div className='inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-800 font-medium px-3 py-1 rounded-full text-xs sm:text-sm border border-emerald-300/40 mb-3'>
                            <span className='bg-emerald-600 px-2 py-0.5 rounded-full text-white text-[11px] font-bold'>SPECIAL</span>
                            <span>Free Shipping Above $50</span>
                            <ChevronRightIcon className='group-hover:translate-x-1 transition-transform' size={14} />
                        </div>

                        <h2 className='text-3xl sm:text-5xl leading-[1.15] font-extrabold text-slate-900 tracking-tight'>
                            Smart Gadgets. <br />
                            <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                                Built for Tomorrow.
                            </span>
                        </h2>

                        <p className='text-xs sm:text-sm text-slate-600 mt-3 max-w-sm'>
                            Discover high-performance wireless audio, smart wearables, and tech essentials curated with precision.
                        </p>

                        <div className='text-slate-800 text-sm font-medium mt-6 sm:mt-8'>
                            <p className='text-xs text-slate-500 uppercase tracking-wider font-semibold'>Starting from</p>
                            <p className='text-3xl font-extrabold text-slate-900'>{currency}4.90</p>
                        </div>

                        <Link
                            href="/shop"
                            className='inline-flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-semibold py-3 px-8 sm:py-4 sm:px-10 mt-6 rounded-xl hover:bg-emerald-600 hover:shadow-lg active:scale-95 transition-all'
                        >
                            <span>Explore Catalog</span>
                            <ArrowRightIcon size={16} />
                        </Link>
                    </div>

                    <Image
                        className='sm:absolute bottom-0 right-0 md:right-6 w-full sm:max-w-sm object-contain pointer-events-none group-hover:scale-105 transition-transform duration-500'
                        src={assets.hero_model_img}
                        alt="Hero Model"
                        priority
                    />
                </div>

                {/* Side Banner Cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-slate-700'>
                    <Link
                        href="/shop?category=Headphones"
                        className='flex-1 flex items-center justify-between w-full bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-6 px-8 group border border-amber-200/60 hover:shadow-lg transition-all'
                    >
                        <div>
                            <span className='text-[11px] font-bold text-amber-700 uppercase tracking-wider'>Premium Audio</span>
                            <p className='text-2xl font-bold text-slate-900 mt-1'>Studio Sound</p>
                            <p className='flex items-center gap-1 mt-3 text-xs font-semibold text-amber-800'>
                                Shop Headphones <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={14} />
                            </p>
                        </div>
                        <Image className='w-28 sm:w-32 object-contain group-hover:scale-110 transition-transform duration-300' src={assets.hero_product_img1} alt="Headphones" />
                    </Link>

                    <Link
                        href="/shop?category=Watch"
                        className='flex-1 flex items-center justify-between w-full bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-6 px-8 group border border-blue-200/60 hover:shadow-lg transition-all'
                    >
                        <div>
                            <span className='text-[11px] font-bold text-blue-700 uppercase tracking-wider'>Wearables</span>
                            <p className='text-2xl font-bold text-slate-900 mt-1'>Smartwatches</p>
                            <p className='flex items-center gap-1 mt-3 text-xs font-semibold text-blue-800'>
                                20% Off Limited <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={14} />
                            </p>
                        </div>
                        <Image className='w-28 sm:w-32 object-contain group-hover:scale-110 transition-transform duration-300' src={assets.hero_product_img2} alt="Smartwatch" />
                    </Link>
                </div>

            </div>

            {/* Live Interactive Category Marquee */}
            <CategoriesMarquee />
        </section>
    )
}

export default Hero