import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {
    return (
        <footer>
            <Container className='mt-8'>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; 2023 TechShop
                    </Col>
                </Row>
            </Container>
        </footer>
  )
}

export default Footer