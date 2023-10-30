import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import { twj } from 'tw-to-css';
import CheckoutSteps from '../components/checkoutSteps';



export default function ShippingScreen() {

    const history = useNavigate()
    const dispatch = useDispatch()

    const { shippingAddress } = useSelector( state => state.cart )

    const [address, setAddress] = useState( shippingAddress.address )
    const [city, setCity] = useState( shippingAddress.city )
    const [state, setState] = useState( shippingAddress.state )
    const [postalCode, setPostalCode] = useState( shippingAddress.postalCode )
    const [country, setCountry] = useState( shippingAddress.country )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch (saveShippingAddress({
            address, city, postalCode, country
        }))
        history('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <h1 className='text-center'>Shipping Address</h1>

            {/* Address */}
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        style={twj("border border-1 border-gray-300")}
                        value={ address || '' }
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* City */}
                <Form.Group controlId='city' className='mt-4'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        style={twj("border border-1 border-gray-300")}
                        value={ city || '' }
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* State */}
                <Form.Group controlId='state' className='mt-4'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter State'
                        style={twj("border border-1 border-gray-300")}
                        value={ state || '' }
                        onChange={(e) => setState(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* Postal Code */}
                <Form.Group controlId='postal_code' className='mt-4'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Postal Code'
                        style={twj("border border-1 border-gray-300")}
                        value={ postalCode || '' }
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* Country */}
                <Form.Group controlId='country' className='mt-4'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        style={twj("border border-1 border-gray-300")}
                        value={ country || '' }
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>                

                {/* Submit Button */}
                <Button
                    type='submit'
                    variant='primary'
                    className='my-4 py-3 w-100'
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}
