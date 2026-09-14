/**
 * AddressModal Component
 * Modal dialog to create and persist user shipping addresses.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addAddress } from "@/lib/features/address/addressSlice"

const AddressModal = ({ setShowAddressModal }) => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addAddress({ ...address, id: `addr_${Date.now()}` }))
        toast.success('Address saved successfully!')
        setShowAddressModal(false)
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
                <button
                    onClick={() => setShowAddressModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
                >
                    <XIcon size={20} />
                </button>

                <h2 className="text-2xl font-bold text-slate-800 mb-1">Add Delivery <span className="text-emerald-600">Address</span></h2>
                <p className="text-xs text-slate-500 mb-5">Please enter your shipping address details</p>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
                    <input
                        name="name"
                        onChange={handleAddressChange}
                        value={address.name}
                        className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                        type="text"
                        placeholder="Full Name (e.g. Gulshan Kumar)"
                        required
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="email"
                            onChange={handleAddressChange}
                            value={address.email}
                            className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                            type="email"
                            placeholder="Email address"
                            required
                        />
                        <input
                            name="phone"
                            onChange={handleAddressChange}
                            value={address.phone}
                            className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                            type="text"
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <input
                        name="street"
                        onChange={handleAddressChange}
                        value={address.street}
                        className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                        type="text"
                        placeholder="Street Address / Hostel / Room No."
                        required
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="city"
                            onChange={handleAddressChange}
                            value={address.city}
                            className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                            type="text"
                            placeholder="City (e.g. Ranchi)"
                            required
                        />
                        <input
                            name="state"
                            onChange={handleAddressChange}
                            value={address.state}
                            className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                            type="text"
                            placeholder="State (e.g. Jharkhand)"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="zip"
                            onChange={handleAddressChange}
                            value={address.zip}
                            className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                            type="text"
                            placeholder="Postal / PIN Code"
                            required
                        />
                        <input
                            name="country"
                            onChange={handleAddressChange}
                            value={address.country}
                            className="p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl w-full text-slate-800"
                            type="text"
                            placeholder="Country"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold py-3 rounded-xl shadow-md transition-all mt-2"
                    >
                        Save Shipping Address
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddressModal