/**
 * AdminCoupons
 * Platform administrator coupon management suite.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { useEffect, useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { Trash2Icon, TicketPercent, Plus } from "lucide-react"
import { couponDummyData } from "@/assets/assets"

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([])

    const [newCoupon, setNewCoupon] = useState({
        code: '',
        description: '',
        discount: '',
        forNewUser: false,
        forMember: false,
        isPublic: false,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })

    const fetchCoupons = async () => {
        setCoupons(couponDummyData)
    }

    const handleAddCoupon = async (e) => {
        e.preventDefault()
        if (!newCoupon.code.trim()) {
            toast.error("Please enter a valid coupon code")
            return
        }

        const couponObj = {
            ...newCoupon,
            code: newCoupon.code.trim().toUpperCase(),
            discount: Number(newCoupon.discount),
            createdAt: new Date().toISOString()
        }

        setCoupons(prev => [couponObj, ...prev])
        toast.success(`Coupon ${couponObj.code} added successfully!`)

        // Reset form
        setNewCoupon({
            code: '',
            description: '',
            discount: '',
            forNewUser: false,
            forMember: false,
            isPublic: false,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })
    }

    const handleChange = (e) => {
        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
    }

    const deleteCoupon = async (code) => {
        setCoupons(prev => prev.filter(c => c.code !== code))
        toast.success(`Coupon ${code} removed`)
    }

    useEffect(() => {
        fetchCoupons()
    }, [])

    return (
        <div className="text-slate-600 mb-20 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <TicketPercent className="text-emerald-600" /> Platform Discount Engine
                </h1>
                <p className="text-xs text-slate-500 mt-1">Create, manage, and distribute promotional codes for shoppers and Plus members.</p>
            </div>

            {/* Add Coupon Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-xl">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Plus size={18} className="text-emerald-600" /> Create New Coupon
                </h2>
                <form onSubmit={handleAddCoupon} className="text-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-slate-600 block mb-1">Coupon Code</label>
                            <input
                                type="text"
                                placeholder="e.g. FESTIVE30"
                                className="w-full p-2.5 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none uppercase font-bold text-slate-800"
                                name="code"
                                value={newCoupon.code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-600 block mb-1">Discount Percentage (%)</label>
                            <input
                                type="number"
                                placeholder="e.g. 25"
                                min={1}
                                max={100}
                                className="w-full p-2.5 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none font-bold text-slate-800"
                                name="discount"
                                value={newCoupon.discount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Description</label>
                        <input
                            type="text"
                            placeholder="e.g. 25% Off Summer Tech Fest"
                            className="w-full p-2.5 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none text-slate-800"
                            name="description"
                            value={newCoupon.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Coupon Expiry Date</label>
                        <input
                            type="date"
                            className="w-full p-2.5 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none text-slate-800"
                            name="expiresAt"
                            value={format(new Date(newCoupon.expiresAt), 'yyyy-MM-dd')}
                            onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: new Date(e.target.value) })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <input
                                type="checkbox"
                                name="forNewUser"
                                checked={newCoupon.forNewUser}
                                onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
                                className="accent-emerald-600 size-4 rounded"
                            />
                            <span>New Shoppers Only</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <input
                                type="checkbox"
                                name="forMember"
                                checked={newCoupon.forMember}
                                onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
                                className="accent-emerald-600 size-4 rounded"
                            />
                            <span>Plus Members Only</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold rounded-xl shadow-sm transition"
                    >
                        Publish Coupon
                    </button>
                </form>
            </div>

            {/* List Coupons */}
            <div className="mt-12">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Active Platform Coupons ({coupons.length})</h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                    <table className="min-w-full text-xs sm:text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="py-3.5 px-4 text-left font-bold text-slate-600">Code</th>
                                <th className="py-3.5 px-4 text-left font-bold text-slate-600">Description</th>
                                <th className="py-3.5 px-4 text-left font-bold text-slate-600">Discount</th>
                                <th className="py-3.5 px-4 text-left font-bold text-slate-600">Expires</th>
                                <th className="py-3.5 px-4 text-left font-bold text-slate-600">Audience</th>
                                <th className="py-3.5 px-4 text-center font-bold text-slate-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {coupons.map((coupon) => (
                                <tr key={coupon.code} className="hover:bg-slate-50/70 transition">
                                    <td className="py-3.5 px-4 font-bold text-emerald-700">{coupon.code}</td>
                                    <td className="py-3.5 px-4 text-slate-600">{coupon.description}</td>
                                    <td className="py-3.5 px-4 font-semibold text-slate-900">{coupon.discount}%</td>
                                    <td className="py-3.5 px-4 text-slate-500">{format(new Date(coupon.expiresAt), 'MMM dd, yyyy')}</td>
                                    <td className="py-3.5 px-4">
                                        {coupon.forMember ? (
                                            <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">Plus Members</span>
                                        ) : coupon.forNewUser ? (
                                            <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">New Users</span>
                                        ) : (
                                            <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">All Users</span>
                                        )}
                                    </td>
                                    <td className="py-3.5 px-4 text-center">
                                        <button
                                            onClick={() => deleteCoupon(coupon.code)}
                                            className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
                                            title="Delete coupon"
                                        >
                                            <Trash2Icon size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}