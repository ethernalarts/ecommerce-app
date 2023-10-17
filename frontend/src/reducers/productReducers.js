import React from 'react';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_PRODUCT_DETAILS
} from '../constants/productConstants';
import store from '../store';



export const ProductListReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


// const initialState = {
//     loading: false,
//     error: null,
//     product: null
// };

export const ProductDetailsReducers = (state = { product: { reviews:[] } }, action) => {
  
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        // case CLEAR_PRODUCT_DETAILS:
        //     return initialState

        default:
            return state
    }   
}
