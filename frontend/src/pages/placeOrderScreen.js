import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import Message from '../components/Message';
import naira from '../Naira';
import { twj } from 'tw-to-css';
import CheckoutSteps from '../components/checkoutSteps';



export default function PlaceOrderScreen() {

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 200000 ? 0 : 3000
    cart.taxPrice = (0.08) * cart.itemsPrice

    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
    
    const placeOrderHandler = () => {
        console.log('Place Order')
    }

    return (        
        <div>
            <CheckoutSteps step1 step2 step3 step4 style={twj("mx-auto")} />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>

                            <p>
                                { cart.shippingAddress.address }, { cart.shippingAddress.city },
                                { cart.shippingAddress.postalCode }, { cart.shippingAddress.country }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                { cart.paymentMethod }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Cart Items</h2>
                            
                            {
                                cart.cartItems.length === 0 ? 
                                <Message variant='info'>
                                    Your cart is empty. <Link to="/">Start Shopping</Link>
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        { cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={ index }>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={ item.image } alt={ item.name }  fluid />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product_id}`}>{ item.name }</Link>
                                                    </Col>

                                                    <Col md={5}>
                                                        { item.qty } X { naira.format(item.price) } = {naira.format(item.qty * item.price) }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item: </Col>
                                    <Col>{ naira.format( cart.itemsPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>{ naira.format( cart.shippingPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>{ naira.format( cart.taxPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col>{ naira.format( cart.totalPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    variant='primary'
                                    className='w-100'
                                    onClick={ placeOrderHandler }
                                    disabled={ cart.cartItems === 0 }
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
