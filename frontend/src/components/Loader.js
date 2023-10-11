import React from 'react'
import { Spinner } from 'react-bootstrap';
import { twj } from 'tw-to-css';


export default function Loader() {
    return (
        <Spinner 
            animation="border" 
            role="status"
            style={twj("mx-auto block h-[100px] w-[100px]")}
        >
            <span className="visually-hidden">Loading...</span>

        </Spinner>
    )
}

