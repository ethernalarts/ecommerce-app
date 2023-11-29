import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Product from '../components/product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/paginate';
import TopProductsCarousel from '../components/topProductsCarousel';
import SearchBar from '../components/searchBar';
import { listProducts } from '../actions/productActions';
import { listTopRatedProducts } from '../actions/productActions';
import { twj } from 'tw-to-css';



export default function HomeScreen() {
    
    const dispatch = useDispatch()

    const keyword = useLocation().search
    
    const { error, loading, products, pages, page } = useSelector(state => state.productList)
    
    const { 
        loading:topProductsLoading, 
        error:topProductsError, 
        products:topProducts 
    } = useSelector(state => state.topRatedProducts)

    useEffect(() => {
        dispatch(listProducts(keyword))
        dispatch(listTopRatedProducts())

    }, [ dispatch, keyword ])


    
    return (
        <div style={twj("font-sans mt-10")}>

            {/* { !keyword && <TopProductsCarousel /> } */}             

            {
                loading || topProductsLoading ? <Loader />
                :   topProductsError ? <Message variant="danger">{ topProductsError }</Message>
                    :   
                        error ? <Message variant="danger">{ error }</Message>
                        :                        
                            (
                                <>                                             
                                    <Button 
                                        style={twj("text-2xl font-normal mt-10 mb-2")}                                    
                                    >
                                        Top Sellers
                                    </Button>

                                    <Row>
                                        {
                                            topProducts.map(topProduct => (
                                                <Col
                                                    key={topProduct._id}
                                                    sm={12} md={6} lg={4} xl={3}
                                                >
                                                    <Product product={topProduct} />
                                                </Col>
                                            ))
                                        }
                                    </Row>

                                    {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
                                        
                                    

                                    <Button 
                                        style={twj("text-2xl font-normal mt-20 mb-2")}                                    
                                    >
                                        ALL PRODUCTS
                                    </Button>  

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

                                    <Paginate page={page} pages={pages} keyword={keyword} />
                                </>
                            )                      
                        
            }
        </div>
    )
}