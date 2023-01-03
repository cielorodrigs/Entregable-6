import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { signUpThunk } from 'redux/actions';

const SignUp = () => {

    const { register, handleSubmit, reset } = useForm();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        reset({
            role:'admin'
        })
    }, [])

    const submit = newUser => {
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users',newUser)
            .then(() => navigate('/login'))
    }


    return (
        <div style={{ minHeight: '100vh', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15rem 0' }} >
            <Form onSubmit={handleSubmit(submit)} style={{ width: '50%', minWidth: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}  >

                <div style={{ display: 'flex', width: '100%', gap: '10px' }} >

                    <Form.Group className="mb-3" controlId="firstName" style={{ width: '100%' }} >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="first name" {...register('firstName')} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName" style={{ width: '100%' }} >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder='last name' {...register('lastName')} />

                    </Form.Group>

                </div>

                <Form.Group className="mb-3" controlId="phone" style={{ width: '100%' }} >
                    <Form.Label>Phone (10 characters)</Form.Label>
                    <Form.Control type="number" placeholder="Enter Phone " {...register('phone')} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="email" style={{ width: '100%' }} >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email')} />

                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="role" style={{ width: '100%' }} >
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" placeholder="Enter Role" {...register('role')} />

                </Form.Group> */}

                <Form.Group className="mb-3" controlId="password" style={{ width: '100%' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password')} />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: '100%' }} >
                    Sign Up
                </Button>

                <Link to='/login' style={{ padding: '30px', color: 'rgb(0, 119, 255)' }} >
                    Login
                </Link>
            </Form>
        </div>
    );
};

export default SignUp;