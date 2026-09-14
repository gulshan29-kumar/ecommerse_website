/**
 * StoreAddProduct
 * Vendor product submission form with multi-image preview.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addProduct } from "@/lib/features/product/productSlice"
import { useRouter } from "next/navigation"

export default function StoreAddProduct() {
    const dispatch = useDispatch()
    const router = useRouter()

    const categories = ['Headphones', 'Speakers', 'Watch', 'Earbuds', 'Mouse', 'Decoration', 'Electronics', 'Others']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: "",
        price: "",
        category: "Headphones",
    })

    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const mrpNum = parseFloat(productInfo.mrp)
        const priceNum = parseFloat(productInfo.price)

        if (!productInfo.name.trim()) {
            toast.error("Product name is required")
            return
        }

        // Use uploaded image or fallback to asset
        const selectedImages = Object.values(images)
            .filter(Boolean)
            .map(file => URL.createObjectURL(file))

        const finalImages = selectedImages.length > 0 ? selectedImages : [assets.product_img1]

        const newProd = {
            id: `prod_${Date.now()}`,
            name: productInfo.name,
            description: productInfo.description,
            mrp: mrpNum || priceNum,
            price: priceNum,
            category: productInfo.category,
            images: finalImages,
            inStock: true,
            rating: [{ id: `rat_${Date.now()}`, rating: 5, review: "Initial launch review" }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        dispatch(addProduct(newProd))
        toast.success(`Product "${newProd.name}" added to catalog!`)

        // Navigate to manage products
        setTimeout(() => {
            router.push('/store/manage-product')
        }, 1000)
    }

    return (
        <form onSubmit={onSubmitHandler} className="text-slate-600 mb-28 max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h1 className="text-2xl font-bold text-slate-800">Add New <span className="text-emerald-600">Product</span></h1>
            <p className="text-xs text-slate-400 mt-1 mb-6">List a new product in your vendor store catalog.</p>

            <p className="text-xs font-semibold text-slate-600 mb-2">Product Images</p>
            <div className="flex gap-3 mb-6">
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
                        <div className="size-16 sm:size-20 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl flex items-center justify-center p-2 transition overflow-hidden bg-slate-50">
                            <Image
                                width={120}
                                height={120}
                                className='max-h-full max-w-full object-contain'
                                src={images[key] ? URL.createObjectURL(images[key]) : assets.upload_area}
                                alt="Upload"
                            />
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            id={`images${key}`}
                            onChange={e => setImages({ ...images, [key]: e.target.files[0] })}
                            hidden
                        />
                    </label>
                ))}
            </div>

            <div className="space-y-4 text-sm">
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Product Title</label>
                    <input
                        type="text"
                        name="name"
                        onChange={onChangeHandler}
                        value={productInfo.name}
                        placeholder="e.g. Wireless Noise-Cancelling Headphones"
                        className="w-full p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 rounded-xl"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                        name="description"
                        onChange={onChangeHandler}
                        value={productInfo.description}
                        placeholder="Describe key features, audio quality, battery life..."
                        rows={4}
                        className="w-full p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 rounded-xl resize-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Original Price ($)</label>
                        <input
                            type="number"
                            name="mrp"
                            onChange={onChangeHandler}
                            value={productInfo.mrp}
                            placeholder="e.g. 199"
                            className="w-full p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 rounded-xl"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Offer Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            onChange={onChangeHandler}
                            value={productInfo.price}
                            placeholder="e.g. 149"
                            className="w-full p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 rounded-xl font-bold text-slate-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                        <select
                            name="category"
                            onChange={onChangeHandler}
                            value={productInfo.category}
                            className="w-full p-2.5 px-3.5 outline-none border border-slate-200 focus:border-emerald-500 rounded-xl bg-white"
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl shadow-sm transition-all mt-4"
                >
                    Publish Product to Store
                </button>
            </div>
        </form>
    )
}