import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
    ProductListReducers, 
    ProductDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
    productCreateReviewReducers,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    adminUserUpdateReducer,
} from './reducers/userReducers';

import { 
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    allOrdersReducer,
    orderDeliverReducer,
} from './reducers/orderReducers';


const reducer = combineReducers({
    cart: cartReducer,
    
    productList: ProductListReducers,
    productDetails: ProductDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    productCreateReview: productCreateReviewReducers,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: userListReducer,
    userDelete: userDeleteReducer,
    adminUserUpdate: adminUserUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrdersList: myOrderListReducer,
    allOrders: allOrdersReducer,
    orderDeliver: orderDeliverReducer,
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