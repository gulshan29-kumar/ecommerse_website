/**
 * Orders Page
 * Live order history tracking with real-time sync from Redux orderSlice.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import PageTitle from "@/components/PageTitle"
import OrderItem from "@/components/OrderItem";
import { useSelector } from "react-redux";
import Link from "next/link";
import { PackageOpen, ArrowRight } from "lucide-react";

export default function Orders() {
    const orders = useSelector(state => state.order.list)

    return (
        <div className="min-h-[75vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {orders && orders.length > 0 ? (
                <div>
                    <PageTitle
                        heading="My Order History"
                        text={`Showing ${orders.length} total orders across your profile`}
                        linkText={'Continue Shopping'}
                    />

                    <div className="overflow-x-auto mt-8 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4 sm:p-6">
                        <table className="w-full text-slate-600 table-auto border-collapse">
                            <thead>
                                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-3 max-md:hidden">
                                    <th className="text-left py-3">Ordered Items</th>
                                    <th className="text-center py-3">Total Amount</th>
                                    <th className="text-left py-3">Shipping Address</th>
                                    <th className="text-left py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {orders.map((order) => (
                                    <OrderItem order={order} key={order.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-3xl my-8">
                    <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                        <PackageOpen size={30} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">No orders placed yet</h2>
                    <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
                        You haven&apos;t placed any orders yet. Discover our premium electronics and gadgets to start shopping!
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full shadow-md transition"
                    >
                        Explore Shop Catalog <ArrowRight size={16} />
                    </Link>
                </div>
            )}
        </div>
    )
}