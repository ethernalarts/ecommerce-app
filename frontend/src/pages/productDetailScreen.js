import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { twj } from 'tw-to-css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button, Card, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

import Rating from '../components/rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { CLEAR_PRODUCT_DETAILS, PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { addToCart } from '../actions/cartActions';
import naira from '../Naira';



export default function ProductDetailScreen() {
    
    const { id } = useParams();    
    const dispatch = useDispatch();
    const history = useNavigate();

    const [ qty, setQty ] = useState(1)
    const [ rating, setRating ] = useState(0)
    const [ comment, setComment ] = useState('')

    const { userInfo } = useSelector(state => state.userLogin)
    const { product, error, loading } = useSelector(state => state.productDetails)
    const { 
        loading: loadingProductReview,
        success: successProductReview,
        error: errorProductReview 
    } = useSelector(state => state.productCreateReview)

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails( id ))
        return () => dispatch( { type: CLEAR_PRODUCT_DETAILS } )        

    }, [ dispatch, id, successProductReview ])

    const addToCartHandler = () => {  
        dispatch(addToCart(id, qty))      
        history(`/cart/`)
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id,
            { rating, comment }
        ))
    }


  
    return (
        <div style={twj("font-sans font-normal mt-12")}>
            <Link to='/' className='btn btn-dark my-3'>
                <i className='fas fa-angle-left'></i> Back
            </Link>

            {
                loading ? <Loader />
                :   error ? <Message variant="danger">{ error }</Message>
                    :   
                        (     
                            <>                     
                                <Row>
                                    <Col md={6}>
                                        <Image src={product.image} alt={product.name} fluid />
                                    </Col>

                                    <Col md={6}>                                
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item style={twj("py-2")}>
                                                <h4 style={twj("font-bold")}>
                                                    { product.name }
                                                </h4>
                                            </ListGroup.Item>
                                            
                                            <ListGroup.Item>
                                                Brand: { product.brand }
                                            </ListGroup.Item>
                                            
                                            <ListGroup.Item>
                                                <Rating value={ product.rating } text={`${product.numReviews} review(s)` } color={'#f8e825'} />
                                            </ListGroup.Item>
                                            
                                            <ListGroup.Item style={twj("text-2xl font-bold")}>
                                                { naira.format(product.price) }
                                            </ListGroup.Item>
                                            
                                            <ListGroup.Item>
                                                { product.countInStock } units left
                                            </ListGroup.Item>

                                            <ListGroup variant='flush'>
                                            
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Status:</Col>

                                                        <Col>                                                     
                                                            { 
                                                                product.countInStock > 0 ? 
                                                                    <span style={twj("font-bold text-lg text-green-500")}>
                                                                        In Stock
                                                                    </span> 
                                                                    :   <span style={twj("font-bold text-lg text-gray-400")}>
                                                                            Out of Stock
                                                                        </span>  
                                                            }                                                            
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
                                            
                                                <ListGroup.Item style={twj("py-3.5")}>
                                                    {/* <Link to={`/cart/`} state={{ qty: Number(qty), id:id }}> */}
                                                        <Button 
                                                            onClick={ addToCartHandler }
                                                            type='button' 
                                                            className='btn btn-warning btn-block w-100 py-3' 
                                                            disabled={ product.countInStock === 0 }
                                                        >
                                                            <span style={twj("float-left")}>
                                                                <i class="fa-solid fa-cart-shopping"></i>
                                                            </span>
                                                            
                                                            <span style={twj("text-md font-bold")}>
                                                                Add to Cart
                                                            </span>
                                                        </Button>
                                                    {/* </Link> */}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </ListGroup>                                        
                                    </Col>                                    
                                </Row>                                       
                                
                                {/* Product Description */}
                                <Row className='mx-auto mt-4'>
                                    <Card>                                     
                                        <Col style={twj("text-justify px-3 py-4")}>
                                            <p style={twj("font-bold text-lg mb-2")}>
                                                Product Description
                                            </p>
                                            { product.description }
                                        </Col>
                                    </Card>   
                                </Row>

                                {/* Reviews */}
                                <Row style={twj("mt-12")}>
                                    <Col md={6}>
                                        <Button style={twj("text-lg cursor-arrow font-medium mb-3")}>
                                            Reviews
                                        </Button>

                                        {
                                            product.reviews.length === 0 && 
                                            <Message variant='info'>No Reviews yet</Message>
                                        }

                                        <ListGroup variant='flush'>
                                            {
                                                product.reviews.map((review) => (
                                                    <ListGroup.Item key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating value={review.rating} color='#f8e825' />
                                                        <p>{review.createdAt.substring(0,10)}</p>
                                                        <p>{review.comment}</p>
                                                    </ListGroup.Item>
                                                ))
                                            }

                                            <ListGroupItem>
                                                <h4 className='mb-3'>Write a Review</h4>

                                                { loadingProductReview && <Loader /> }
                                                { 
                                                    successProductReview && 
                                                    <Message variant='success'>
                                                        Review submitted
                                                    </Message>
                                                }
                                                { 
                                                    errorProductReview && 
                                                    <Message variant='danger'>
                                                        { errorProductReview }
                                                    </Message>
                                                }

                                                {
                                                    userInfo ? (
                                                        <Form onSubmit={ submitHandler }>
                                                            <Form.Group controlId='rating'>
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control
                                                                    style={twj("border border-1 font-medium border-gray-300 mb-3")}
                                                                    as='select'
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value=''>Select...</option>
                                                                    <option value='1'>1 - Poor</option>
                                                                    <option value='2'>2 - Fair</option>
                                                                    <option value='3'>3 - Good</option>
                                                                    <option value='4'>4 - Very good</option>
                                                                    <option value='5'>5 - Excellent</option>
                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Form.Group controlId='comment' className='mb-3'>
                                                                <Form.Label>Review</Form.Label>
                                                                <Form.Control
                                                                    style={twj("border border-1 border-gray-300 font-medium")}                                                           
                                                                    as='textarea'
                                                                    row='5'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                >
                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Button
                                                                disabled={loadingProductReview}
                                                                variant='primary'
                                                                type='submit'
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Form>
                                                    ) : (
                                                        <Message variant='info'>
                                                            You need to be <Link to='/login'>logged in</Link> to write a review
                                                        </Message>
                                                    )
                                                }
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </>  
                        )
            }
        </div>
  )
}