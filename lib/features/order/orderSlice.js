/**
 * Order Slice
 * Redux Toolkit slice managing order placement and status updates.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
import { createSlice } from '@reduxjs/toolkit'
import { orderDummyData } from '@/assets/assets'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: orderDummyData,
    },
    reducers: {
        addOrder: (state, action) => {
            state.list.unshift(action.payload)
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload
            const order = state.list.find(o => o.id === orderId)
            if (order) {
                order.status = status
            }
        },
    }
})

export const { addOrder, updateOrderStatus } = orderSlice.actions

export default orderSlice.reducer
