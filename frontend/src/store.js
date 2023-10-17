import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductListReducers, ProductDetailsReducers } from './reducers/productReducers';


const reducer = combineReducers({
    productList: ProductListReducers,
    productDetails: ProductDetailsReducers
})

const initialState = {}
const middleware = [thunk]

export const store = configureStore({ reducer }, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))