import React from 'react'
import { Spinner } from 'react-bootstrap';
import { twj } from 'tw-to-css';


export default function Loader() {
    return (
        <Spinner 
            animation="border" 
            role="status"
            className='d-flex mx-auto justify-content-center spinner-grow m-5'
            style={twj("block h-[60px] w-[60px] text-blue-600")}
        >
            <span className="visually-hidden">Loading...</span>

        </Spinner>
    )
}

