import React from 'react'
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { twj } from 'tw-to-css';



export default function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav 
            fill
            variant='pills'
            className='mb-4 justify-content-center container-fluid'
        >
            <Nav.Item>
                { 
                    step1 ? (                    
                        <LinkContainer to='/login' style={twj("")}>
                            <Nav.Link eventKey="1" className='fw-normal'>Login</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Login</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                { 
                    step2 ? (                    
                        <LinkContainer to='/shipping' style={twj("")}>
                            <Nav.Link eventKey="2" className='normal'>Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Shipping</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                { 
                    step3 ? (                    
                        <LinkContainer to='/payment' style={twj("")}>
                            <Nav.Link eventKey="3" className='fw-normal'>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                { 
                    step4 ? (                    
                        <LinkContainer to='/placeorder' style={twj("")}>
                            <Nav.Link eventKey="4" className='fw-normal'>Place Order</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )
                }
            </Nav.Item>
        </Nav>
    )
}
