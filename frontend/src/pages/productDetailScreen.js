import React, { useState, useEffect } from 'react'
import { twj } from 'tw-to-css';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, Button, Card, ListGroup } from 'react-bootstrap';

import Rating from '../components/rating';
import axios from 'axios';


export default function ProductDetailPage() {   

    const { id } = useParams()

    const [product, setProduct] = useState([])

    useEffect(() => {
        // sourcery skip: avoid-function-declarations-in-blocks
        async function getProductDetailsPage() {          
            const { data } = await axios.get(`/api/products/${ id }`)
            setProduct( data )
        }

        getProductDetailsPage()

    }, [])
    
    return (
        <div style={twj("font-sans font-normal")}>
            <Link to='/' className='btn btn-light my-3'>Back to Home</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{ product.name }</h3>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Rating value={ product.rating } text={`${product.numReviews} reviews` } color={'#f8e825'} />
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            Price: &#8358;{ product.price }
                        </ListGroup.Item>
                        
                        <ListGroup.Item style={twj("text-justify")}>
                            Description: { product.description }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                <Col md={3}>
                    <Card>
                      <ListGroup variant='flush'>
                          <ListGroup.Item>
                              <Row>
                                <Col>
                                    Price
                                </Col>

                                <Col>
                                    <strong>&#8358;{ product.price }</strong>
                                </Col>
                              </Row>
                          </ListGroup.Item>

                          
                          <ListGroup.Item>
                              <Row>
                                <Col>
                                    Status
                                </Col>

                                <Col>
                                    { product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                </Col>
                              </Row>
                          </ListGroup.Item>
                          
                          <ListGroup.Item>
                              <Button type='button' className='btn btn-dark w-100' disabled={ product.countInStock === 0 }>
                                  Add to Cart
                              </Button>
                          </ListGroup.Item>
                      </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}
