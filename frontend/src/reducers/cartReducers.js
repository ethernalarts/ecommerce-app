import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_DECREASE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS
} from '../constants/cartConstants';
//import {initialState} from '../store';



const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || [],
    paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || []
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
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        case CART_DECREASE_ITEM:
            const cartItem = state.cartItems.find( item => item.product_id === action.payload.product_id )

            if (action.payload.qty > 1) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        item => item.product_id === cartItem.product_id ? 
                            { ...item, qty: item.qty - 1 } 
                            : item
                    )
                }                
            }            
        
        default:
            return state
    }
}