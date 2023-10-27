import React, { useState, useEffect } from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { twj } from 'tw-to-css';



export default function ProfileScreen() {    
    
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')   
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage ] = useState('')

    const history = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => { return state.userDetails })
    const { loading, user, error } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    
    useEffect(() => {
        if ( !userInfo ) {
            history('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch ({ type: USER_UPDATE_PROFILE_RESET })
                dispatch (getUserDetails('profile'))
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
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                { message && <Message variant='danger'>{ message }</Message> }
                { error && <Message variant='danger'>{ error }</Message> }
                { loading && <Loader /> }

                <Form onSubmit={ submitHandler }>

                    {/* Name Form Group */}
                    <Form.Group controlId='name'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Full Name'
                            style={twj("border border-1 border-gray-300")}
                            value={ name }
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    {/* Username Form Group */}
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Username'
                            style={twj("border border-1 border-gray-300")}
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
                            style={twj("border border-1 border-gray-300")}
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
                            style={twj("border border-1 border-gray-300")}
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
                            style={twj("border border-1 border-gray-300")}
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
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}
