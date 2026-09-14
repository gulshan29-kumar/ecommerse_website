/**
 * StoreManageProducts
 * Vendor portal inventory table with stock toggles and deletion.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { deleteProduct } from "@/lib/features/product/productSlice"
import { Trash2, PackagePlus } from "lucide-react"
import Link from "next/link"

export default function StoreManageProducts() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.list)
    const [stockMap, setStockMap] = useState({})

    const toggleStock = (productId) => {
        setStockMap(prev => {
            const current = prev[productId] !== undefined ? prev[productId] : true
            const updated = !current
            toast.success(updated ? "Product marked in stock" : "Product marked out of stock")
            return { ...prev, [productId]: updated }
        })
    }

    const handleDelete = (productId, name) => {
        dispatch(deleteProduct({ productId }))
        toast.success(`Removed "${name}" from store`)
    }

    return (
        <div className="mb-20 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Manage <span className="text-emerald-600">Inventory</span></h1>
                    <p className="text-xs text-slate-400 mt-0.5">Control pricing, stock availability, and catalog listings</p>
                </div>
                <Link
                    href="/store/add-product"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                >
                    <PackagePlus size={16} /> Add New Product
                </Link>
            </div>

            <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-3.5">Product</th>
                            <th className="px-4 py-3.5 hidden md:table-cell">Category</th>
                            <th className="px-4 py-3.5 hidden md:table-cell">MRP</th>
                            <th className="px-4 py-3.5">Price</th>
                            <th className="px-4 py-3.5 text-center">In Stock</th>
                            <th className="px-4 py-3.5 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {products.map((product) => {
                            const inStock = stockMap[product.id] !== undefined ? stockMap[product.id] : (product.inStock ?? true)
                            return (
                                <tr key={product.id} className="hover:bg-slate-50/70 transition">
                                    <td className="px-4 py-3">
                                        <div className="flex gap-3 items-center">
                                            <div className="size-11 shrink-0 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-1">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    className='max-h-full max-w-full object-contain'
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 text-xs sm:text-sm line-clamp-1">{product.name}</p>
                                                <p className="text-[11px] text-slate-400 md:hidden">{product.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell">{product.category}</td>
                                    <td className="px-4 py-3 text-xs text-slate-400 line-through hidden md:table-cell">
                                        {currency}{product.mrp?.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 font-bold text-slate-900 text-xs sm:text-sm">
                                        {currency}{product.price?.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => toggleStock(product.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                                                inStock
                                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                            }`}
                                        >
                                            {inStock ? 'In Stock' : 'Out of Stock'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                                            title="Delete product"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}