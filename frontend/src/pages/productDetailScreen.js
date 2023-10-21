import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { twj } from 'tw-to-css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button, Card, Form, ListGroup } from 'react-bootstrap';

import Rating from '../components/rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import { CLEAR_PRODUCT_DETAILS } from '../constants/productConstants';
import { addToCart } from '../actions/cartActions';
import CartScreen from './CartScreen';



export default function ProductDetailScreen() {
    const { id } = useParams();    
    const dispatch = useDispatch();
    const history = useNavigate();

    const [ qty, setQty ] = useState(1)
    const productDetails = useSelector(state => state.productDetails);
    const { product, error, loading } = productDetails;

    useEffect(() => { 
        dispatch ( listProductDetails( id ))
        return () => dispatch( { type: CLEAR_PRODUCT_DETAILS } )        

    }, [ dispatch, id ])

    const addToCartHandler = () => {  
        dispatch(addToCart(id, qty))      
        history(`/cart/`)
    }
    
  
    return (
        <div style={twj("font-sans font-normal")}>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {
                loading ? <Loader />
                :   error ? <Message variant="danger">{ error }</Message>
                    :   
                        (                            
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                    
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{ product.name }</h3>
                                        </ListGroup.Item>
                                        
                                        <ListGroup.Item>
                                            <Rating value={ product.rating } text={`${product.numReviews} reviews` } color={'#f8e825'} />
                                        </ListGroup.Item>
                                        
                                        <ListGroup.Item>
                                            Price: &#8358;{ product.price }
                                        </ListGroup.Item>
                                        
                                        <ListGroup.Item style={twj("text-justify")}>
                                            Description: { product.description }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price</Col>

                                                    <Col>
                                                        &#8358;{ product.price }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status
                                                    </Col>

                                                    <Col>
                                                        { product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            { product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs="auto" className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                className='border-1'
                                                                value={ qty }
                                                                onChange={ (e) => setQty(Number(e.target.value)) }
                                                            >
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={ x + 1} value={ x + 1}>
                                                                            { x + 1 }
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ) }
                                            
                                            <ListGroup.Item>
                                                {/* <Link to={`/cart/`} state={{ qty: Number(qty), id:id }}> */}
                                                    <Button 
                                                        onClick={ addToCartHandler }
                                                        type='button' 
                                                        className='btn btn-dark btn-block w-100' 
                                                        disabled={ product.countInStock === 0 }>
                                                        Add to Cart
                                                    </Button>
                                                {/* </Link> */}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
            }
        </div>
  )
}