import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cartDetails',
    initialState: {
        cart: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        itemAdded: (state, action) => { state.cart.push(action.payload) },
        itemDelete: (state, action) => { console.log(action.payload)
            state.cart = state.cart.filter((item) => item.cartproductId !== action.payload)
        },
        itemOrdered: (state,action) => {state.cart = action.payload}
    }
})

export const {setCart, itemAdded, itemDelete, itemOrdered} = cartSlice.actions
export default cartSlice.reducer