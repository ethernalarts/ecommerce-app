import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form, Card, Table } from 'react-bootstrap';
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
        <div>
            <h1 className='text-center mb-4'>Your Cart</h1>

            <Link to="/">
                <Button 
                    className='btn btn-dark mt-4 mb-3' 
                    type='button'
                >
                    <i className='fas fa-angle-left'></i><span className='ms-2'>Go Back</span>
                </Button>
            </Link>

            
            { 
                cartItems.length === 0 ? (
                <Message variant="info" className='mt-4 fw-medium'>
                    Your cart is empty. <Link to="/">Start Shopping</Link>
                </Message>
                ) : 
                    (
                        <Table striped hover responsive className="table-md fw-medium" style={twj("shadow-md")}>
                            <thead className='text-center'>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    cartItems.map(item => (
                                        <tr key={ item.product_id }>
                                            <td>
                                                <Image src={ item.image } alt={ item.name } style={twj("w-28")} fluid />
                                            </td>

                                            <td>
                                                <Link to={`/products/${ item.product_id }`} >
                                                    { item.name }
                                                </Link>
                                            </td>

                                            <td>
                                                { naira.format(item.price) }
                                            </td>

                                            <td>
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
                                            </td>

                                            <td>
                                                <Button 
                                                    type='button' 
                                                    variant='danger'
                                                    onClick={() => removeFromCartHandler( item.product_id )}
                                                >
                                                    <i className='fas fa-trash' style={twj("mr-2")}></i>Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
            }
            
            <div md={3} className='w-50 mt-4 mb-4 text-center mx-auto'>
                <Card style={twj("")}>
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
                                className='btn-block w-100 mt-4 mb-4'
                                disabled={ cartItems.length === 0 }
                                onClick={ checkoutHandler }
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>

        </div>
    )
}

export default CartScreen
