import React, { useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { twj } from 'tw-to-css';



export default function LoginScreen() {
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin
    
    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [ history, userInfo, redirect ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login( email, password ))
    }

    return (
        <FormContainer>
            <h1 className='text-center'>Sign In</h1>

            { error && <Message variant='danger'>{ error }</Message> }
            
            { 
                loading ? 
                    <Loader /> 
                        : (
                            <Form onSubmit={ submitHandler } className='fw-medium'>

                                {/* Email Form Group */}
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter Email'
                                        style={twj("font-medium border border-1 border-gray-300")}
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
                                        style={twj("font-medium border border-1 border-gray-300")}
                                        placeholder='Enter Password'
                                        value={ password }
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='my-4 py-3 w-100'
                                >
                                    Sign In
                                </Button>

                                <Row className='py-3 text-center fw-medium'>
                                    <Col>
                                        New Customer? 
                                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='mx-3'>
                                            Register
                                        </Link>
                                    </Col>
                                </Row>     
                            </Form>
                )
            }       
        </FormContainer>
    )
}
