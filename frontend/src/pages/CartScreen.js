import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form, Card } from 'react-bootstrap';
import Message from '../components/Message';
import naira from '../Naira';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { twj } from 'tw-to-css';



function CartScreen() {
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const { id } = useParams()

    const product_id = id

    const qty = location.search ? Number(new URLSearchParams(location.search).get('qty')) : 1

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart    
    
    useEffect(() => {
        if ( product_id ) {
            dispatch( addToCart( product_id, qty ) )
        }
    }, [dispatch, product_id, qty])

    const removeFromCartHandler = ( product_id ) => {
        dispatch(removeFromCart( product_id ))
    }

    const checkoutHandler = () => {
        history('/login?redirect=/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                { 
                    cartItems.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty. <Link to="/">Start Shopping</Link>
                    </Message>
                    ) : 
                        (
                            <ListGroup variant="flush">
                                {
                                    cartItems.map(item => (
                                        <ListGroup.Item key={ item.product_id }>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={ item.image } alt={ item.name } fluid />
                                                </Col>

                                                <Col md={3}>
                                                    <Link to={`/products/${ item.product_id }`} >
                                                        { item.name }
                                                    </Link>
                                                </Col>

                                                <Col md={2}>
                                                    { naira.format(item.price) }
                                                </Col>

                                                <Col md={2}>
                                                    <Form.Control
                                                        as="select"
                                                        className='border-1'
                                                        value={ item.qty }
                                                        onChange={ (event) => dispatch( addToCart( item.product_id, Number(event.target.value) ) ) }
                                                    >
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={ x + 1} value={ x + 1}>
                                                                    { x + 1 }
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>

                                                <Col md={3}>
                                                    <Button 
                                                        type='button' 
                                                        variant='light'
                                                        className='text-danger'
                                                        onClick={() => removeFromCartHandler( item.product_id )}
                                                    >
                                                        <i className='fas fa-trash' style={twj("mr-2")}></i>REMOVE
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                }
            </Col>
            
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</h2>
                            <Row>
                                <Col>Total Amount:</Col>
                                <Col style={twj("font-bold")}>
                                    { naira.format( cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) ) }
                                </Col>
                            </Row>                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'    
                                className='btn-block w-100'
                                disabled={ cartItems.length === 0 }
                                onClick={ checkoutHandler }
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

            <Col className='m-4 p-2'>
                <Link to="/">
                    <Button className='btn btn-dark'>
                        <i className='fas fa-arrow-left'></i>
                    </Button>
                </Link>
            </Col>
        </Row>
    )
}

export default CartScreen
