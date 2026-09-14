/**
 * CategoriesMarquee Component
 * Infinite looping category pills with hover pause.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { categories } from "@/assets/assets";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const CategoriesMarquee = () => {
    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-10 sm:my-16">
            <div className="flex items-center justify-between mb-4 px-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-500" /> Featured Categories
                </p>
                <Link href="/shop" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition">
                    View All Products &rarr;
                </Link>
            </div>

            <div className="relative overflow-hidden py-2">
                <div className="absolute left-0 top-0 h-full w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="flex min-w-[200%] animate-[marqueeScroll_18s_linear_infinite] sm:animate-[marqueeScroll_35s_linear_infinite] group-hover:[animation-play-state:paused] gap-3.5">
                    {[...categories, ...categories, ...categories, ...categories].map((cat, index) => (
                        <Link
                            key={index}
                            href={`/shop?category=${encodeURIComponent(cat)}`}
                            className="inline-flex items-center px-5 py-2.5 bg-slate-100/80 hover:bg-emerald-600 hover:text-white border border-slate-200 hover:border-emerald-600 rounded-full text-slate-700 text-xs sm:text-sm font-medium shadow-xs hover:shadow-md active:scale-95 transition-all duration-200"
                        >
                            <span>{cat}</span>
                        </Link>
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>
    );
};

export default CategoriesMarquee;