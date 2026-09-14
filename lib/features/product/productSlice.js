/**
 * Product Slice
 * Redux Toolkit slice managing live product catalog.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
import { createSlice } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        addProduct: (state, action) => {
            state.list.unshift(action.payload)
        },
        deleteProduct: (state, action) => {
            state.list = state.list.filter(p => p.id !== action.payload.productId)
        },
        clearProduct: (state) => {
            state.list = []
        }
    }
})

export const { setProduct, addProduct, deleteProduct, clearProduct } = productSlice.actions

export default productSlice.reducer