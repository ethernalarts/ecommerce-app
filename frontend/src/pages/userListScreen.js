import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userActions';


export default function UserListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const usersList = useSelector(state => state.usersList)
    const { loading, users, error } = usersList
    
    const { userInfo } = useSelector(state => state.userLogin)
    const { success: successDelete } = useSelector(state => state.userDelete)

    useEffect(() => {
        if ( userInfo && userInfo.isAdmin ) {
            dispatch(listUsers())
        } else {
            history('/login')
        }
    }, [ dispatch, history, successDelete, userInfo ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure? This action is irreversible')) {            
            dispatch(deleteUser(id))
        }
    }

    
    return (
        <div>
            <h1 className='text-center'>All Users</h1>
            {
                loading 
                ? ( <Loader /> )
                    :   error 
                        ? ( <Message variant='danger'>{ error }</Message> )
                            : (
                                <Table striped hover responsive className='table-sm mt-4'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>ADMIN</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className='text-center fw-medium'>
                                        {
                                            users.map(user => (
                                                <tr key={ user._id }>
                                                    <td>{ user._id }</td>
                                                    <td>{ user.name }</td>
                                                    <td>{ user.email }</td>
                                                    <td>
                                                        { user.isAdmin ? (
                                                            <i className='fas fa-check' style={{ color: 'green'}}></i>
                                                        ) : (
                                                            <i className='fas fa-xmark' style={{ color: 'red'}}></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <LinkContainer to={`/admin/user/${ user._id }/edit`}>
                                                            <Button variant='light' className='btn-sm'>
                                                                <i className='fas fa-pen' style={{ color: 'green'}}></i>
                                                            </Button>
                                                        </LinkContainer>
                                                        
                                                        <Button 
                                                            variant='danger' 
                                                            className='btn-sm'
                                                            onClick={() => deleteHandler( user._id )}
                                                        >
                                                            <i class="fas fa-trash"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            )
            }

        </div>
    )
}
