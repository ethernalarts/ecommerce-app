import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import { PayPalButton } from "react-paypal-button-v2";
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import naira from '../Naira';
import { twj } from 'tw-to-css';



export default function OrderScreen() {    

    const dispatch = useDispatch()
    const history = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const { id } = useParams()
    const orderId = id
    
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVFx5Z9_03LvN6tYi0xWaH7mv6MBf6zA2M8Icf1SpUhrfm4_4z88q7xQLJouuIfBK8b9COfQKcas24ao'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    if ( !loading && !error ) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    useEffect(() => {
        if ( !order || successPay || order._id !== Number(orderId) ) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails( orderId ))
        } else if ( !order.isPaid ) {
            if ( !window.paypal ) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [ dispatch, order, orderId, successPay ])

    const successPaymentHandler = ( paymentResult ) => {
        dispatch(payOrder( orderId, paymentResult ))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> :
    (        
        <div>
            <h1 className='text-center mb-4 mt-2'>Order Details</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>{ order.user.name }
                            </p>
                            <p>
                                <strong>Email: </strong><a href={`mailto: ${order.user.email}`}>{ order.user.email }</a>
                            </p>
                            <p> 
                                <strong>Address: </strong>
                                { order.shippingAddress.address }, { order.shippingAddress.city },
                                { order.shippingAddress.postalCode }, { order.shippingAddress.country }
                            </p>
                            {
                                order.isDelivered ? (
                                    <Message variant='success'>
                                        Deliverd on { order.delivereddAt }
                                    </Message>
                                ) : (
                                    <Message variant='warning'>
                                        Not yet delivered
                                    </Message>
                                )
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong>{ order.paymentMethod }
                            </p>
                            {
                                order.isPaid ? (
                                    <Message variant='success'>
                                        Paid on { order.paidAt }
                                    </Message>
                                ) : (
                                    <Message variant='warning'>
                                        Not Paid
                                    </Message>
                                )
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            
                            {
                                order.orderItems.length === 0 ? 
                                <Message variant='info'>
                                    You have no orders. <Link to="/">Start Shopping</Link>
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        { order.orderItems.map((item, index) => (
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
                                <h2 className='text-center'>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item: </Col>
                                    <Col>{ naira.format( order.itemsPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>{ naira.format( order.shippingPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>{ naira.format( order.taxPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col>{ naira.format( order.totalPrice ) }</Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                !order.isPaid && (
                                    <ListGroup.Item className='mt-2'>
                                        {
                                            sdkReady ? (
                                                <PayPalButton
                                                    amount={ order.totalPrice }
                                                    onSuccess={ successPaymentHandler }
                                                />
                                            ) : <Loader />
                                        }
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
