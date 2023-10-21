import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductListReducers, ProductDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';


const reducer = combineReducers({
    productList: ProductListReducers,
    productDetails: ProductDetailsReducers,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const middleware = [thunk]

export const store = configureStore({ reducer }, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))