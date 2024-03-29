import React, { useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getMyOrdersList } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { twj } from 'tw-to-css';
import naira from '../Naira';



export default function ProfileScreen() {    
    
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')   
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage ] = useState('')

    const history = useNavigate()
    const dispatch = useDispatch()

    const { loading, user, error } = useSelector(state => { return state.userDetails })

    const { userInfo } = useSelector(state => state.userLogin)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrdersList = useSelector(state => state.myOrdersList)
    const { orders, error: errorOrders, loading: loadingOrders } = myOrdersList
    
    useEffect(() => {
        if ( !userInfo ) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrdersList())
            } else {
                setName(user.name)
                setUsername(user.username)
                setEmail(user.email)
                setPassword(user.password)
                setConfirmPassword(user.confirmPassword)
            }
        }
    }, [ dispatch, history, userInfo, user, success ])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage ('Passwords do not match')
        } else {
            dispatch (updateUserProfile({
                'id': user._id,
                'name': name,
                'username': username,
                'email': email,
                'password': password
            }))
            setMessage ('')
        }
    }



    return (
        <Row style={twj("mt-12 font-medium")}>
            <Col md={3}>
                <h2 className='text-center'>User Profile</h2>

                { message && <Message variant='danger'>{ message }</Message> }
                { error && <Message variant='danger'>{ error }</Message> }
                { loading && <Loader /> }

                <Form onSubmit={ submitHandler } className='mt-4'>

                    {/* Name Form Group */}
                    <Form.Group controlId='name'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Full Name'
                            style={twj("border border-1 border-gray-300 font-medium")}
                            value={ name }
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* Username Form Group */}
                    <Form.Group controlId='username' className='mt-4'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Username'
                            style={twj("border border-1 border-gray-300 font-medium")}
                            value={ username }
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* Email Form Group */}
                    <Form.Group controlId='email' className='mt-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            style={twj("border border-1 border-gray-300 font-medium")}
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* Password Form Group */}
                    <Form.Group controlId='password' className='mt-4'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            style={twj("border border-1 border-gray-300 font-medium")}
                            value={ password }
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* Confirm Password Form Group */}
                    <Form.Group controlId='passwordConfirm' className='mt-4'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            style={twj("border border-1 border-gray-300 font-medium")}
                            value={ confirmPassword }
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                        type='submit'
                        variant='primary'
                        className='my-4 py-3 btn-dark w-100'
                    >
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2 className='text-center'>My Orders</h2>

                {
                    loadingOrders ? (
                        <Loader />                        
                    ) : errorOrders ? (
                        <Message variant='danger'>{ errorOrders }</Message>
                    ) : (
                        <Table striped responsive className='table-sm mt-5'>
                            <thead className='text-center'>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total Price</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody className='text-center fw-medium'>
                                {
                                    orders.map(order => (
                                        <tr key={ order._id }>
                                            <td>{ order._id }</td>
                                            <td>{ order.createdAt.substring(0,10) }</td>
                                            <td>{ naira.format(order.totalPrice) }</td>
                                            <td>
                                                { 
                                                    order.isPaid 
                                                    ?   <span style={twj("text-green-600")}>
                                                            { order.paidAt.substring(0,10) }
                                                        </span>
                                                    : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                    ) 
                                                }
                                            </td>
                                            <td>
                                                { 
                                                    order.isDelivered 
                                                    ? order.deliveredAt.substring(0,10) 
                                                    : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                    ) 
                                                }
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>
                                                        Details
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    )
}
