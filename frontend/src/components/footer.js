import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { twj } from 'tw-to-css';


function Footer() {
    return (
        <footer >
            <Container style={twj("mt-0")}>
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