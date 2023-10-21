import React from 'react'
import { twj } from 'tw-to-css';
import { Card, Button } from 'react-bootstrap';
import Rating from './rating';
import { Link } from 'react-router-dom';


export default function Product({ product }) {
  return (
        <Card className='' style={twj("font-sans text-md my-4 border-1")}>
            <Link to={`/product/${ product._id }`}>
                <Card.Img src={ product.image } />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{ product.name }</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className='my-3'>
                        <Rating value={product.rating} text={`(${product.numReviews})`} color={'#f8e825'} />
                    </div>
                </Card.Text>

                <Card.Text style={twj("font-sans text-gray-600 font-bold text-2xl")}>
                    &#8358;{ product.price }
                </Card.Text>

                {/* <Card.Link>
                    <Button 
                        onChange=""
                        type='button' 
                        className='my-2 btn btn-warning w-100 btn-block' 
                        disabled={ product.countInStock === 0 }>
                        Add to Cart
                    </Button>
                </Card.Link> */}
            </Card.Body>
        </Card>
  )
}
//box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);