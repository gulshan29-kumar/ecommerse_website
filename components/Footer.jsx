/**
 * Footer Component
 * Categorized footer with direct catalog filters and developer attribution.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import Link from "next/link";
import { Mail, Phone, MapPin, Heart, ArrowUpRight, Github, Linkedin, Twitter, Sparkles } from "lucide-react";

const Footer = () => {
    const linkSections = [
        {
            title: "CATEGORIES",
            links: [
                { text: "Headphones", path: '/shop?category=Headphones' },
                { text: "Speakers & Audio", path: '/shop?category=Speakers' },
                { text: "Smartwatches", path: '/shop?category=Watch' },
                { text: "Wireless Earbuds", path: '/shop?category=Earbuds' },
                { text: "Gaming Mice", path: '/shop?category=Mouse' },
            ]
        },
        {
            title: "EXPLORE",
            links: [
                { text: "All Products", path: '/shop' },
                { text: "Become Plus Member", path: '/pricing' },
                { text: "Open Your Store", path: '/create-store' },
                { text: "My Orders", path: '/orders' },
                { text: "Vendor Portal", path: '/store' },
                { text: "Admin Suite", path: '/admin' },
            ]
        },
        {
            title: "CONTACT & DEV",
            links: [
                { text: "gulshankumar29082006@gmail.com", path: 'mailto:gulshankumar29082006@gmail.com', icon: Mail },
                { text: "+91 98765 43210", path: 'tel:+919876543210', icon: Phone },
                { text: "IIIT Ranchi, Jharkhand, India", path: 'https://maps.google.com/?q=IIIT+Ranchi', icon: MapPin },
            ]
        }
    ];

    return (
        <footer className="mt-20 border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50 text-slate-600">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
                    
                    {/* Brand & Bio */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="text-3xl font-extrabold tracking-tight text-slate-800 flex items-center">
                            <span className="text-emerald-600">go</span>cart<span className="text-emerald-500 text-3xl">.</span>
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                                <Sparkles size={10} /> Multi-Vendor
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                            NovaCart is an ultra-fast, multi-vendor e-commerce destination engineered by <strong>Gulshan Kumar</strong> at <strong>IIIT Ranchi</strong>. Built for high performance, intuitive shopping, vendor autonomy, and streamlined administrator operations.
                        </p>
                        
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://github.com/gulshan29-kumar"
                                target="_blank"
                                rel="noreferrer"
                                className="size-9 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 flex items-center justify-center transition"
                                title="Gulshan's GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="size-9 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 flex items-center justify-center transition"
                                title="LinkedIn Profile"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="size-9 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 flex items-center justify-center transition"
                                title="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {linkSections.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">{section.title}</h3>
                            <ul className="space-y-2.5 text-sm">
                                {section.links.map((link, i) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <li key={i}>
                                            <Link
                                                href={link.path}
                                                className="hover:text-emerald-600 flex items-center gap-2 transition group"
                                            >
                                                {IconComponent && <IconComponent size={15} className="text-emerald-600 shrink-0" />}
                                                <span className="group-hover:translate-x-0.5 transition-transform">{link.text}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Attribution & Copyright */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                        Crafted with <Heart size={14} className="text-red-500 fill-red-500" /> by <strong className="text-slate-700">Gulshan Kumar</strong> (IIIT Ranchi)
                    </p>
                    <p>
                        © 2026 NovaCart. All rights reserved. Built with Next.js 15 & Tailwind CSS.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;