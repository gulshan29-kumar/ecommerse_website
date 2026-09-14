/**
 * OrderItem Component
 * Displays placed order item, status badges, shipping address, and rating modal trigger.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import Image from "next/image";
import { DotIcon, Clock, CheckCircle2, Truck, PackageCheck } from "lucide-react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);
    const { ratings } = useSelector(state => state.rating);

    const statusUpper = (order.status || '').toUpperCase();

    const getStatusBadge = () => {
        switch (statusUpper) {
            case 'DELIVERED':
                return {
                    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    icon: CheckCircle2,
                    label: 'Delivered'
                };
            case 'SHIPPED':
                return {
                    bg: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: Truck,
                    label: 'In Transit / Shipped'
                };
            case 'PROCESSING':
                return {
                    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    icon: Clock,
                    label: 'Processing'
                };
            case 'ORDER_PLACED':
            default:
                return {
                    bg: 'bg-amber-50 text-amber-700 border-amber-200',
                    icon: PackageCheck,
                    label: 'Order Placed'
                };
        }
    };

    const statusInfo = getStatusBadge();
    const StatusIcon = statusInfo.icon;

    return (
        <>
            <tr className="text-sm hover:bg-slate-50/50 transition">
                <td className="text-left py-4">
                    <div className="flex flex-col gap-4">
                        {order.orderItems.map((item, index) => {
                            const productImage = item.product?.images?.[0] || item.product?.image;
                            return (
                                <div key={index} className="flex items-center gap-3.5">
                                    <div className="w-16 h-16 shrink-0 bg-slate-100 flex items-center justify-center rounded-xl p-2 border border-slate-200">
                                        {productImage ? (
                                            <Image
                                                className="max-h-12 w-auto object-contain"
                                                src={productImage}
                                                alt={item.product?.name || "Product"}
                                                width={48}
                                                height={48}
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-400">No image</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center text-xs sm:text-sm">
                                        <p className="font-semibold text-slate-800 line-clamp-1">{item.product?.name || 'Product'}</p>
                                        <p className="text-slate-500 mt-0.5">
                                            {currency}{item.price} &times; {item.quantity} units
                                        </p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                            Ordered on {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="mt-1">
                                            {ratings.find(rating => order.id === rating.orderId && item.product?.id === rating.productId) ? (
                                                <Rating value={ratings.find(rating => order.id === rating.orderId && item.product?.id === rating.productId).rating} />
                                            ) : (
                                                <button
                                                    onClick={() => setRatingModal({ orderId: order.id, productId: item.product?.id })}
                                                    className={`text-emerald-600 hover:text-emerald-700 text-xs font-medium hover:underline ${statusUpper !== "DELIVERED" && 'hidden'}`}
                                                >
                                                    Rate this product
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                    </div>
                </td>

                <td className="text-center font-bold text-slate-900 max-md:hidden">
                    {currency}{Number(order.total).toFixed(2)}
                    {order.isPaid ? (
                        <span className="block text-[10px] text-emerald-600 font-normal">Paid online</span>
                    ) : (
                        <span className="block text-[10px] text-slate-400 font-normal">Cash on Delivery</span>
                    )}
                </td>

                <td className="text-left text-xs max-md:hidden text-slate-600">
                    <p className="font-semibold text-slate-800">{order.address?.name}</p>
                    <p className="text-slate-500 mt-0.5">{order.address?.street}, {order.address?.city}</p>
                    <p className="text-slate-500">{order.address?.state} - {order.address?.zip}</p>
                    {order.address?.phone && <p className="text-slate-400 mt-0.5">Ph: {order.address?.phone}</p>}
                </td>

                <td className="text-left max-md:hidden">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.bg}`}>
                        <StatusIcon size={12} />
                        {statusInfo.label}
                    </span>
                </td>
            </tr>

            {/* Mobile View */}
            <tr className="md:hidden">
                <td colSpan={4} className="pb-4 pt-1">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">Total: {currency}{Number(order.total).toFixed(2)}</span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.bg}`}>
                                <StatusIcon size={11} /> {statusInfo.label}
                            </span>
                        </div>
                        <p className="text-slate-500">
                            Deliver to: <strong>{order.address?.name}</strong>, {order.address?.street}, {order.address?.city}
                        </p>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <div className="border-b border-slate-200 my-2" />
                </td>
            </tr>
        </>
    );
};

export default OrderItem;