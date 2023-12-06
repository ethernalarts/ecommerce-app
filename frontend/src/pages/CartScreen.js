import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form, Card, Table } from 'react-bootstrap';
import { removeFromCart, decreaseCartItem, increaseCartItem } from '../actions/cartActions';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import { twj } from 'tw-to-css';
import naira from '../Naira';


function CartScreen() {
    
    const dispatch = useDispatch()
    const history = useNavigate()

    const location = useLocation()
    const { id } = useParams()
    const product_id = id

    const qty = location.search ? Number(new URLSearchParams(location.search).get('qty')) : 1

    const { cartItems } = useSelector(state => state.cart)

    const [cart, setCart] = useState([]);

    useEffect(() => {
        //localStorage.setItem('cart', JSON.stringify(cart));
        JSON.parse(localStorage.cart)
        //JSON.parse(localStorage.getItem('cartItems'))
    }, [cart]);

    const removeFromCartHandler = ( product_id, product_name ) => {
        dispatch(removeFromCart( product_id ))
        toast.error(`${product_name} has been removed from your cart`, {
            position: "bottom-left"
        })
    }

    const decreaseCartItemHandler = ( product_id, qty ) => {
        dispatch(decreaseCartItem( product_id, qty ))        
        toast.success("item quantity has been decreased", {
            position: "bottom-left"
        })
    }

    // const increaseCartItemHandler = ( product_id, qty ) => {
    //     dispatch(increaseCartItem( product_id, qty ))        
    //     toast.success("item quantity has been increased", {
    //         position: "bottom-left"
    //     })
    // }

    const checkoutHandler = () => {
        history('/login?redirect=/shipping')
    }



    return (
        <div style={twj("mt-12")}>
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
                    Your cart is empty. <Link to="/" className='fw-bold'>Start Shopping</Link>
                </Message>
                ) : 
                    (
                        <Table striped hover responsive className="table-md fw-medium text-left" style={twj("shadow-md")}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    {/* <th></th> */}
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    cartItems.map(item => (
                                        <tr key={ item.product_id }>
                                            <td>
                                                <Row xs={12} md={4}>
                                                    <Col>
                                                        <Image src={ item.image } alt={ item.name } style={twj("w-32")} fluid />
                                                    </Col>
                                                    <Col md={5}>
                                                        <Link to={`/products/${ item.product_id }`}>
                                                            { item.name }
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </td>

                                            {/* <td>
                                                <Link to={`/products/${ item.product_id }`} >
                                                    { item.name }
                                                </Link>
                                            </td> */}

                                            <td md={2}>
                                                { naira.format(item.price) }
                                            </td>

                                            <td>
                                                <Row xs={12} md={3}>
                                                    <Button                                                        
                                                        type='button' 
                                                        //variant='dark'
                                                        onClick={() => decreaseCartItemHandler( item.product_id, item.qty )}
                                                    >
                                                        -
                                                    </Button>
                                                        <div className='p-2 text-center'>{item.qty}</div>
                                                    <Button
                                                        type='button'
                                                        //onClick={() => increaseCartItemHandler( item.product_id, item.qty )}
                                                    >
                                                        +
                                                    </Button>
                                                </Row>
                                                
                                                    {/* <Form.Control
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
                                                    </Form.Control>                                                 */}                                                
                                                
                                            </td>

                                            <td>
                                                <Button 
                                                    type='button' 
                                                    variant='danger'
                                                    onClick={() => removeFromCartHandler( item.product_id, item.name )}
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
            
            
            <Col md={6} className='mt-4 mb-4 text-center mx-auto'>
                <Card style={twj("")}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</h2>
                            <Row>
                                <Col>Total Amount:</Col>
                                <Col style={twj("font-bold text-lg")}>
                                    { naira.format( cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) ) }
                                </Col>
                            </Row>                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'    
                                variant='info'
                                className='btn-block w-100 mt-4 mb-2'
                                disabled={ cartItems.length === 0 }
                                onClick={ checkoutHandler }
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </div>
    )
}

export default CartScreen
