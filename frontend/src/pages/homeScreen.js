import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { twj } from 'tw-to-css';
import { Row, Col, Button } from 'react-bootstrap';

import Product from '../components/product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';



export default function HomeScreen() {
    
    const dispatch = useDispatch()
    
    const { error, loading, products } = useSelector(state => state.productList)

    useEffect(() => {
        dispatch(listProducts())

    }, [ dispatch ])

    
    return (
        <div style={twj("font-sans mt-8")}>
            <Button 
                style={twj("text-3xl font-normal mb-3")}                                    
            >
                Top Sellers
            </Button>

            {
                loading ? <Loader />
                :   error ? <Message variant="danger">{ error }</Message>
                    :   (
                            <>                                
                                <Row>
                                    {
                                        products.map(product => (
                                            <Col
                                                key={product._id}
                                                sm={12} md={6} lg={4} xl={3}
                                            >
                                                <Product product={product} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </>
                    )                       
                        
            }
        </div>
    )
}