import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { toast } from 'react-toastify';
import Rating from './rating';
import naira from '../Naira';
import { twj } from 'tw-to-css';


export default function Product({ product }) {
    
    const dispatch = useDispatch()
    
    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1))
        toast.success(`${product.name} has been added to your cart`, {
            position: "bottom-left"
        })
    }


    return (
        <Card className='shadow' style={twj("font-sans text-md my-4 border-0")}>
            <Link to={`/product/${ product._id }`}>
                <Card.Img src={ product.image } />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" style={twj("font-sans font-normal text-gray-700 text-center")}>
                        { product.name }
                    </Card.Title>
                </Link>

                {/* <Card.Text as="div">
                    <div className='my-3'>
                        <Rating value={product.rating} text={`(${product.numReviews})`} color={'#f8e825'} />
                    </div>
                </Card.Text> */}

                <Card.Text style={twj("font-sans text-center my-6 font-bold text-2xl")}>
                    { naira.format(product.price) }
                </Card.Text>

                <Card.Link>
                    <Button 
                        type='button' 
                        //variant='warning'
                        className='my-2 w-100'
                        style={twj("bg-orange-500 shadow-md hover:bg-orange-400")}
                        onClick={ addToCartHandler }
                        disabled={ product.countInStock === 0 }
                    >
                        { 
                            product.countInStock === 0 ? 'Out of Stock'
                            :   (
                                    <div>
                                        <span style={twj("float-left")}>
                                            <i class="fa-solid fa-cart-shopping"></i>                                    
                                        </span>                                        
                                        Add to Cart
                                    </div>
                            )
                        }
                    </Button>
                </Card.Link>
            </Card.Body>
        </Card>
    )
}
//box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);