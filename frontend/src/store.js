import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductListReducers, ProductDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';
import { 
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
} from './reducers/orderReducers';


const reducer = combineReducers({
    productList: ProductListReducers,
    productDetails: ProductDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
})

const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) || []
const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || null
const shippingAddressFromStorage = JSON.parse(localStorage.getItem('shippingAddress')) || []
const paymentMethodFromStorage = JSON.parse(localStorage.getItem('paymentMethod')) || []

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = configureStore({ reducer }, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export { store, initialState }