/**
 * Rating Slice
 * Redux Toolkit slice managing product reviews.
 * Authored by Gulshan Kumar (IIIT Ranchi)
 */
import { createSlice } from '@reduxjs/toolkit'


const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        ratings: [],
    },
    reducers: {
        addRating: (state, action) => {
            state.ratings.push(action.payload)
        },
    }
})

export const { addRating } = ratingSlice.actions

export default ratingSlice.reducer