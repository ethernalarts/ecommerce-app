import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import login from '../actions/userActions';



export default function loginScreen() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    return (
        <div>
            Login
        </div>
    )
}
