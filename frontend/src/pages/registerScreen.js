import React, { useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { twj } from 'tw-to-css';



export default function RegisterScreen() {    
    
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage ] = useState('')

    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister
    
    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [ history, userInfo, redirect ])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage ('Passwords do not match')
        } else {
            dispatch(register( name, email, password ))
        }
    }

    return (
        <FormContainer>
            <h1 className='text-center'>Register</h1>

            { message && <Message variant='danger'>{ message }</Message> }
            { error && <Message variant='danger'>{ error }</Message> }
            { loading && <Loader /> }

            <Form onSubmit={ submitHandler }>

                {/* Name Form Group */}
                <Form.Group controlId='name'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Full Name'
                        style={twj("border border-1 border-gray-200")}
                        value={ name }
                        onChange={(e) => setName(e.target.value)}
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
                        style={twj("border border-1 border-gray-200")}
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* Password Form Group */}
                <Form.Group controlId='password' className='mt-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        style={twj("border border-1 border-gray-200")}
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* Confirm Password Form Group */}
                <Form.Group controlId='passwordConfirm' className='mt-4'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        style={twj("border border-1 border-gray-200")}
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
                    Register
                </Button>
            </Form>

            <Row className='py-3 text-center'>
                <Col>
                    Already a Customer? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='mx-3'>
                        Sign In
                    </Link>
                </Col>
            </Row>
        
        </FormContainer>
    )
}
