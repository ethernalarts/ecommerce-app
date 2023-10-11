import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { twj } from 'tw-to-css';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';



export default function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch (listProducts())

    }, [ dispatch ])

    
    return (
        <div style={twj("font-sans mt-10")}>
            <h1 style={twj("text-3xl font-bold text-gray-600")}>Latest Products</h1>
            {
                loading ? <Loader />
                :   error ? <Message variant="danger">{ error }</Message>
                    :  
                        <Row>
                            { products.map( product => (
                                <Col 
                                    key={ product._id } 
                                    sm={12} md={6} lg={4} xl={3}>
                                    <Product product={ product } />
                                </Col>
                            ))}
                        </Row>
            }
        </div>
    )
}