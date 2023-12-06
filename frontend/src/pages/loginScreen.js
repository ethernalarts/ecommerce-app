import React, { useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
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
            toast.success(`You are logged in as ${userInfo.name}`, {
                position: "bottom-left"
            })
        }
    }, [ history, userInfo, redirect ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login( email, password ))
    }


    return (
        <FormContainer>
            <h1 style={twj("text-center mt-10")}>Sign In</h1>

            { error && <Message variant='danger'>{ error }</Message> }
            
            {
                loading ? 
                    <Loader /> 
                        : (
                            <Form onSubmit={ submitHandler } className='fw-medium mx-auto content-center'>

                                {/* Email Form Group */}
                                <Form.Group controlId='email'>
                                    <Form.Label className='fw-bold'>Email Address</Form.Label>
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
                                    <Form.Label className='fw-bold'>Password</Form.Label>
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
                                    variant='info'                                    
                                    style={twj("my-6 py-4 w-full mx-auto")}
                                >
                                    <i class="fa-solid fa-right-to-bracket fa-xl"></i>
                                </Button>

                                <Row className='py-3 text-center fw-medium'>
                                    <Col>
                                        New Customer? 
                                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='mx-3 fw-bold'>
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
