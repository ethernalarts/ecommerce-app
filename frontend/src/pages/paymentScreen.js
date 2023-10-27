import React, { useState, useEffect } from 'react'
import { twj } from 'tw-to-css';
import CheckoutSteps from '../components/checkoutSteps';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';



export default function PaymentScreen() {

    const history = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')    

    const { shippingAddress } = useSelector( state => state.cart )

    if ( !shippingAddress.address ) {
        history('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch ( savePaymentMethod(paymentMethod) )
        history('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={ submitHandler }>
                <Form.Group>
                    <Form.Label as='legend'>Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            value={ paymentMethod }
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-4'>
                    Continue
                </Button>
            </Form>

        </FormContainer>
    )
}
