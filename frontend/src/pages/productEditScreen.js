import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { twj } from 'tw-to-css';



export default function ProductEditScreen() {
    
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ image, setImage ] = useState('')
    const [ brand, setBrand ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ countInStock, setCountInStock ] = useState(0)
    const [ description, setDescription ] = useState('')
    const [ uploading, setUploading ] = useState(false)

    const dispatch = useDispatch()
    const history = useNavigate()
    
    const { id } = useParams()
    const productId = id
        
    const { loading, product, error } = useSelector(state => state.productDetails)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate
    } = useSelector(state => state.productUpdate)
    
    useEffect(() => {    
        if ( successUpdate ) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history('/admin/productlist')
        } else {      
            if ( !product.name || product._id !== Number(productId)) {          
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)  
            }            
        }  
    }, [ dispatch, product, productId, history, successUpdate ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: product._id,
            name, price,
            image, brand,
            category, description,
            countInStock
        }))        
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'                    
                }
            }

            const { data } = await axios.post(
                '/api/products/uploadimage/',
                formData,
                config
            )

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }

    }


    return (
        <div>
            <Link to='/admin/productlist'>
                <Button variant='dark'>
                    <i className='fas fa-angle-left'></i><span className='ms-2'>Go Back</span>
                </Button>
            </Link>

            <FormContainer className='mt-4'>
                <h1 className='text-center'>Edit Product</h1>
                
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
                                    <Form.Group controlId='name' className='mt-2 mb-3'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control

                                            type='text'
                                            placeholder='Enter Product Name'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            value={ name }
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Price Form Group */}
                                    <Form.Group controlId='price' className='mb-3'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control

                                            type='number'
                                            placeholder='Enter Product Price'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            value={ price }
                                            onChange={(e) => setPrice(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    {/* Image Form Group */}
                                    <Form.Group controlId='image-file' className='mb-3'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            style={twj("font-medium border border-1 border-gray-400 mb-3")}
                                            type='text'
                                            value={ image }
                                            onChange={(e) => setImage(e.target.value)}
                                            disabled
                                        >                                            
                                        </Form.Control>
                                        <Form.Control

                                            type='file'
                                            custom
                                            //placeholder='Upload Product Image'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            onChange={ uploadFileHandler }
                                        >
                                        </Form.Control>
                                        { uploading && <Loader /> }
                                    </Form.Group>

                                    {/* Brand Form Group */}
                                    <Form.Group controlId='brand' className='mb-3'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control

                                            type='text'
                                            placeholder='Enter Product Brand'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            value={ brand }
                                            onChange={(e) => setBrand(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Category Form Group */}
                                    <Form.Group controlId='category' className='mb-3'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control

                                            type='text'
                                            placeholder='Enter Product Category'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            value={ category }
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Description Form Group */}
                                    <Form.Group controlId='description' className='mb-3'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            type='text'
                                            placeholder='Enter Product Description'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            value={ description }
                                            onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Count In Stock Form Group */}
                                    <Form.Group controlId='countinstock' className='mb-3'>
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control

                                            type='number'
                                            placeholder='Enter Count In Stock'
                                            style={twj("font-medium border border-1 border-gray-400")}
                                            value={ countInStock }
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Update Button */}
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        className='my-2 py-3 btn-dark w-100'
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
