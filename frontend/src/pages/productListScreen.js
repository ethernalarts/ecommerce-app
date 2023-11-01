import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, deleteProduct } from '../actions/productActions';
import naira from '../Naira';
import { twj } from 'tw-to-css';



export default function ProductListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    const { loading, products, error } = useSelector(state => state.productList)
    
    const { userInfo } = useSelector(state => state.userLogin)
    const { 
        loading: loadingDelete, 
        success: successDelete,
        error: errorDelete
    } = useSelector(state => state.productDelete)

    useEffect(() => {
        if ( userInfo && userInfo.isAdmin ) {
            dispatch(listProducts())
        } else {
            history('/login')
        }
    }, [ dispatch, history, userInfo, successDelete ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure? This action is irreversible')) {            
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = ( product ) => {
        //pass
    }

    
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col style={twj("text-right")}>
                    <Button className='my-3' onClick={ createProductHandler }>
                        <i className='fas fa-plus'></i><span className='ms-2'>Create Product</span>
                    </Button>
                </Col>
            </Row>

            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant='danger'>{ errorDelete }</Message>}

            {
                loading 
                ? ( <Loader /> )
                    :   error 
                        ? ( <Message variant='danger'>{ error }</Message> )
                            : (
                                <Table striped hover bordered responsive className='table-sm mt-4'>
                                    <thead className='text-center'>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th>BRAND</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className='text-center fw-medium'>
                                        {
                                            products.map(product => (
                                                <tr key={ product._id }>
                                                    <td>{ product._id }</td>
                                                    <td>{ product.name }</td>
                                                    <td>{ naira.format( product.price ) }</td>
                                                    <td>{ product.category }</td>
                                                    <td>{ product.brand }</td>
                                                    <td>
                                                        <LinkContainer to={`/admin/product/${ product._id }/edit`}>
                                                            <Button variant='light' className='btn-sm'>
                                                                <i className='fas fa-pen' style={{ color: 'green'}}></i>
                                                            </Button>
                                                        </LinkContainer>
                                                        
                                                        <Button 
                                                            variant='danger' 
                                                            className='btn-sm'
                                                            onClick={() => deleteHandler( product._id )}
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
