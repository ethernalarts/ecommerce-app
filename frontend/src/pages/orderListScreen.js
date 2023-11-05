import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getAllOrders } from '../actions/orderActions';
import { twj } from 'tw-to-css';
import naira from '../Naira';



export default function OrderListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const { loading, orders, error } = useSelector(state => state.allOrders)
    
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if ( userInfo && userInfo.isAdmin ) {
            dispatch(getAllOrders())
        } else {
            history('/login')
        }
    }, [ dispatch, history, userInfo ])

    // const deleteHandler = (id) => {
    //     if (window.confirm('Are you sure? This action is irreversible')) {            
    //         dispatch(deleteUser(id))
    //     }
    // }

    
    return (
        <div>
            <h1 className='text-center'>All Orders</h1>
            {
                loading 
                ? ( <Loader /> )
                    :   error 
                        ? ( <Message variant='danger'>{ error }</Message> )
                            : (
                                <Table striped hover bordered responsive className='table-sm mt-4 fw-medium'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th>ID</th>
                                            <th>USER</th>
                                            <th>DATE</th>
                                            <th>TOTAL PRICE</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className='text-center fw-medium'>
                                        {
                                            orders.map(order => (
                                                <tr key={ order._id }>
                                                    <td>{ order._id }</td>
                                                    <td>{ order.user ? order.user.name : '' }</td>
                                                    <td>{ order.createdAt.substring(0,10) }</td>
                                                    <td>{ naira.format(order.totalPrice) }</td>

                                                    <td>
                                                        { order.isPaid ? (
                                                            <span style={twj("text-green-600 font-medium")}>
                                                                { order.paidAt.substring(0,10) }
                                                            </span>
                                                        ) : (
                                                            <i className='fas fa-xmark' style={{ color: 'red'}}></i>
                                                        )}
                                                    </td>

                                                    <td>
                                                        { order.isDelivered ? (
                                                            <span style={twj("text-green-600")}>
                                                                { order.deliveredAt.substring(0,10) }
                                                            </span>
                                                        ) : (
                                                            <i className='fas fa-xmark' style={{ color: 'red'}}></i>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <LinkContainer to={`/order/${ order._id }/`}>
                                                            <Button variant='dark' className='btn-sm'>
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

        </div>
    )
}
