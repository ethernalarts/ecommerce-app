import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { listTopRatedProducts } from '../actions/productActions';
import naira from '../Naira';



export default function TopProductsCarousel() {

    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.topRatedProducts)

    useEffect(() => {
        dispatch(listTopRatedProducts())
    }, [ dispatch ])



    return (
        loading ?
        <Loader />
            : error ?
                <Message variant='danger'>
                    { error }
                </Message>
                    : (
                        <Carousel
                            pause='hover'
                            className='bg-dark mb-4'
                        >
                            {
                                products.map((product) => (
                                    <Carousel.Item
                                        key={ product._id }
                                    >
                                        <Link to={`/product/${product._id}/`}>
                                            <Image src={ product.image } alt={ product.name } fluid/>
                                            <Carousel.Caption className='carousel.caption'>
                                                <h4>{ product.name } ({ naira.format(product.price) })</h4>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    )
    )
}
