/**
 * OrderSummary Component
 * Checkout engine supporting multi-coupon verification and order dispatch.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { PlusIcon, SquarePenIcon, XIcon, CheckCircle2, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { couponDummyData } from '@/assets/assets';
import { addOrder } from '@/lib/features/order/orderSlice';
import { clearCart } from '@/lib/features/cart/cartSlice';

const OrderSummary = ({ totalPrice, items }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();
    const dispatch = useDispatch();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(addressList.length > 0 ? addressList[0] : null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState(null);

    const handleCouponCode = async (event) => {
        event.preventDefault();
        const codeClean = couponCodeInput.trim().toUpperCase();
        if (!codeClean) return;

        const matched = couponDummyData.find(c => c.code.toUpperCase() === codeClean);
        if (matched) {
            setCoupon(matched);
            toast.success(`Coupon applied! You saved ${matched.discount}%`, {
                icon: '🎉',
                style: { borderRadius: '12px', background: '#0f172a', color: '#fff' }
            });
            setCouponCodeInput('');
        } else {
            toast.error('Invalid coupon code! Try "NEW20" or "OFF10"', {
                style: { borderRadius: '12px', background: '#0f172a', color: '#fff' }
            });
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const shippingAddress = selectedAddress || (addressList.length > 0 ? addressList[0] : null);

        if (!shippingAddress) {
            toast.error('Please add a delivery address first!');
            setShowAddressModal(true);
            return;
        }

        const discountAmount = coupon ? (coupon.discount / 100) * totalPrice : 0;
        const finalTotal = parseFloat((totalPrice - discountAmount).toFixed(2));
        const orderId = `ord_${Date.now()}`;

        const newOrder = {
            id: orderId,
            total: finalTotal,
            status: "ORDER_PLACED",
            userId: "user_gulshan",
            storeId: "store_gulshan_tech",
            addressId: shippingAddress.id || "addr_main",
            isPaid: paymentMethod === 'STRIPE',
            paymentMethod: paymentMethod,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isCouponUsed: Boolean(coupon),
            coupon: coupon || null,
            orderItems: items.map(item => ({
                orderId: orderId,
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                product: item
            })),
            address: shippingAddress,
            user: {
                id: "user_gulshan",
                name: "Gulshan Kumar",
                email: "gulshankumar29082006@gmail.com"
            }
        };

        // Dispatch order creation and clear cart
        dispatch(addOrder(newOrder));
        dispatch(clearCart());

        toast.success('Order placed successfully! Redirecting to orders...', {
            icon: '🚀',
            duration: 3000,
            style: { borderRadius: '12px', background: '#0f172a', color: '#fff' }
        });

        setTimeout(() => {
            router.push('/orders');
        }, 1200);
    };

    const discountAmount = coupon ? (coupon.discount / 100) * totalPrice : 0;
    const finalTotal = totalPrice - discountAmount;

    return (
        <div className='w-full max-w-lg lg:max-w-[360px] bg-white border border-slate-200 shadow-sm text-slate-600 text-sm rounded-2xl p-6'>
            <h2 className='text-lg font-bold text-slate-800 flex items-center justify-between'>
                <span>Order Summary</span>
                <span className='text-xs font-normal text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1'>
                    <ShieldCheck size={12} /> Secure Checkout
                </span>
            </h2>

            {/* Payment Method Selection */}
            <div className='mt-4 pt-3 border-t border-slate-100'>
                <p className='text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5'>Payment Method</p>
                <div className='space-y-2'>
                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'COD' ? 'border-emerald-500 bg-emerald-50/40 text-slate-900 font-medium' : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                        <div className='flex items-center gap-2.5'>
                            <input
                                type="radio"
                                id="COD"
                                name="payment"
                                onChange={() => setPaymentMethod('COD')}
                                checked={paymentMethod === 'COD'}
                                className='accent-emerald-600'
                            />
                            <span>Cash on Delivery (COD)</span>
                        </div>
                        <span className='text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full'>Pay at door</span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'STRIPE' ? 'border-emerald-500 bg-emerald-50/40 text-slate-900 font-medium' : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                        <div className='flex items-center gap-2.5'>
                            <input
                                type="radio"
                                id="STRIPE"
                                name='payment'
                                onChange={() => setPaymentMethod('STRIPE')}
                                checked={paymentMethod === 'STRIPE'}
                                className='accent-emerald-600'
                            />
                            <span>Card / Online (Stripe)</span>
                        </div>
                        <span className='text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full'>Instant</span>
                    </label>
                </div>
            </div>

            {/* Address Selection */}
            <div className='my-4 py-3 border-y border-slate-100 text-slate-600'>
                <div className='flex items-center justify-between mb-2'>
                    <p className='text-xs font-bold uppercase tracking-wider text-slate-400'>Shipping Address</p>
                    <button
                        type="button"
                        onClick={() => setShowAddressModal(true)}
                        className='text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-0.5'
                    >
                        <PlusIcon size={12} /> Add New
                    </button>
                </div>

                {selectedAddress ? (
                    <div className='bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex items-start justify-between gap-2'>
                        <div>
                            <p className='font-bold text-slate-800'>{selectedAddress.name}</p>
                            <p className='text-slate-500 mt-0.5'>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zip}</p>
                            {selectedAddress.phone && <p className='text-slate-400 mt-0.5'>Phone: {selectedAddress.phone}</p>}
                        </div>
                        <button
                            type="button"
                            onClick={() => setSelectedAddress(null)}
                            className='text-slate-400 hover:text-slate-600'
                            title="Change address"
                        >
                            <SquarePenIcon size={15} />
                        </button>
                    </div>
                ) : (
                    <div>
                        {addressList.length > 0 ? (
                            <select
                                className='border border-slate-200 p-2.5 text-xs w-full outline-none rounded-xl bg-white'
                                onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                                defaultValue=""
                            >
                                <option value="" disabled>Select an existing address</option>
                                {addressList.map((addr, index) => (
                                    <option key={index} value={index}>
                                        {addr.name} — {addr.city}, {addr.state}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <button
                                type="button"
                                className='w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500 hover:border-emerald-500 hover:text-emerald-600 transition flex items-center justify-center gap-1.5'
                                onClick={() => setShowAddressModal(true)}
                            >
                                <PlusIcon size={14} /> Add Delivery Address
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Price Calculations */}
            <div className='pb-4 border-b border-slate-100 space-y-2 text-xs'>
                <div className='flex justify-between text-slate-500'>
                    <span>Subtotal</span>
                    <span className='font-semibold text-slate-800'>{currency}{totalPrice.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-slate-500'>
                    <span>Standard Shipping</span>
                    <span className='font-semibold text-emerald-600'>Free</span>
                </div>
                {coupon && (
                    <div className='flex justify-between text-emerald-600 font-medium'>
                        <span>Coupon Discount ({coupon.code})</span>
                        <span>-{currency}{discountAmount.toFixed(2)}</span>
                    </div>
                )}

                {/* Coupon Input Form */}
                {!coupon ? (
                    <form onSubmit={handleCouponCode} className='flex items-center gap-2 pt-2'>
                        <input
                            onChange={(e) => setCouponCodeInput(e.target.value)}
                            value={couponCodeInput}
                            type="text"
                            placeholder='Enter code (e.g. NEW20)'
                            className='border border-slate-200 p-2 rounded-xl text-xs w-full outline-none focus:border-emerald-500 uppercase'
                        />
                        <button
                            type="submit"
                            className='bg-slate-900 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold active:scale-95 transition'
                        >
                            Apply
                        </button>
                    </form>
                ) : (
                    <div className='w-full flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-2.5 mt-2'>
                        <div className='flex items-center gap-1.5'>
                            <CheckCircle2 size={15} className='text-emerald-600' />
                            <div>
                                <p className='font-bold'>{coupon.code}</p>
                                <p className='text-[10px] text-emerald-600'>{coupon.description}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setCoupon(null)}
                            className='text-slate-400 hover:text-red-500 p-1'
                            title="Remove coupon"
                        >
                            <XIcon size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Total Price & Checkout Button */}
            <div className='flex items-baseline justify-between py-4'>
                <div>
                    <p className='text-xs font-bold uppercase tracking-wider text-slate-400'>Total Amount</p>
                    <p className='text-xs text-slate-400'>Inclusive of all taxes</p>
                </div>
                <p className='text-2xl font-extrabold text-slate-900'>
                    {currency}{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>

            <button
                onClick={handlePlaceOrder}
                className='w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2'
            >
                Confirm & Place Order
            </button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
        </div>
    )
}

export default OrderSummary