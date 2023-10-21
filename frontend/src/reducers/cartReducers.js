import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants';



const initialState = {
    cartItems: localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems')) 
        : []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case CART_ADD_ITEM:

            const newItem = action.payload
            const itemInCart = state.cartItems.find(item => item.product_id === newItem.product_id)

            if (itemInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        item => item.product_id === itemInCart.product_id ? 
                            { ...item, qty: item.qty + newItem.qty } 
                            : item
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [ ...state.cartItems, newItem ]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter( item => item.product_id !== action.payload )
            }

        default:
            return state
    }
}