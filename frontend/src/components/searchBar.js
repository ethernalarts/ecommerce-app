import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { twj } from 'tw-to-css';



export default function SearchBar() {

    let history = useNavigate()
    const location = useLocation()

    const [ keyword, setKeyword ] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history(`/?keyword=${keyword}&page=1`)
        } else {
            history(location.pathname)
        }
    }


    return (
        <Form onSubmit={submitHandler} style={twj("inline-flex")}>
            <Form.Control
                type='search'
                name='q'
                //value={keyword}
                onChange={ (e) => setKeyword(e.target.value) }
                className='mr-sm-2 ml-sm-5'
                //style={twj("border border-2 border-gray-400")}
                placeholder='Search for a product...'

            >
            </Form.Control>

            <Button
                type='submit'
                variant='warning'
                className='p-2 px-3 ms-2'
            >
                Search
            </Button>
        </Form>
    )
}
