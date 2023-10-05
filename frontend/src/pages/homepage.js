import React from 'react'
import products from '../products';
import Product from '../components/product';
import { Row, Col } from 'react-bootstrap';


function HomePage() {
  return (
    <div className='mt-4'>
        <h1>Latest Products</h1>
        <Row>
            { products.map( product => (
                <Col key={ product._id } sm={12} md={6} lg={4} xl={3}>
                    <Product product={ product } />
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomePage