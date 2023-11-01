import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails, adminUpdateUserProfile } from '../actions/userActions';
import { twj } from 'tw-to-css';
import { ADMIN_USER_UPDATE_RESET } from '../constants/userConstants';



export default function UserEditScreen() {    
    
    const [ name, setName ] = useState('')
    const [ username, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState(false)

    const dispatch = useDispatch()
    const history = useNavigate()
    
    const { id } = useParams()
    const userId = id
        
    const { loading, user, error } = useSelector(state => state.userDetails)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate
    } = useSelector(state => state.adminUserUpdate)
    
    useEffect(() => {
        if ( successUpdate ) {
            dispatch({
                type: ADMIN_USER_UPDATE_RESET
            })
            history('/admin/userlist')            
        } else {            
            if ( !user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setUserName(user.username)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [ dispatch, user, userId, successUpdate, history ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUserProfile({
            _id: user._id,
            name,
            username,
            email,
            isAdmin
        }))        
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                <Button variant='light'>
                    Go Back
                </Button>
            </Link>

            <FormContainer>
                <h1 className='text-center'>Edit User</h1>
                
                { loadingUpdate && <Loader />}
                { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message>}

                {
                    loading ?
                        <Loader />
                        : error ?
                            <Message variant='danger'>
                                { error }
                            </Message>
                            : (
                                <Form onSubmit={ submitHandler } className='fw-medium'>

                                    {/* Name Form Group */}
                                    <Form.Group controlId='name' className='mt-2'>
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Full Name'
                                            style={twj("border border-1 border-gray-300")}
                                            value={ name }
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Username Form Group */}
                                    <Form.Group controlId='username' className='mt-2'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Username'
                                            style={twj("border border-1 border-gray-300")}
                                            value={ username }
                                            onChange={(e) => setUserName(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Email Form Group */}
                                    <Form.Group controlId='email' className='mt-4'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter Email'
                                            style={twj("border border-1 border-gray-300")}
                                            value={ email }
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    {/* Is Admin Form Group */}
                                    <Form.Group controlId='isadmin' className='mt-4'>
                                        <Form.Label>Is Admin</Form.Label>
                                        <Form.Check
                                            type='checkbox'
                                            style={twj("border border-1 border-gray-300")}
                                            checked={ isAdmin }
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >
                                        </Form.Check>
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        className='my-4 py-3 btn-dark w-100'
                                    >
                                        update
                                    </Button>
                                </Form>       
                            )
                }
                                 
            </FormContainer>
        </div>        
    )
}
