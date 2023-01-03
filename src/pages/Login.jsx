import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const Login = () => {

   const login = localStorage.getItem('token');

   const { handleSubmit, register, reset } = useForm();
   const dispatch = useDispatch();

   const [ isShowUsersDefault , setIsShowUsersDefault ] = useState(true);

   const navigate = useNavigate();

   const products = useSelector(state => state.products);

   useEffect(() => {

      if (products.length === 0) {
         dispatch(getProductsThunk());
      } else {
         dispatch(setIsLoading(true));
         setTimeout(() => dispatch(setIsLoading(false)), 400);
      }
      reset(
         {
            email: '',
            password: ''
         }
      )

   }, []);

   const submit = (userLogin) => {
      axios
         .post('https://e-commerce-api.academlo.tech/api/v1/users/login', userLogin)
         .then(res => {
            localStorage.setItem('token', res.data.data.token);
            // navigate('/');
            window.location.reload();
         })
         .catch(error => {
            if (error.response?.status == 404) {
               alert('Algo salio mal');
            };
         });
   };


   return (
      <div style={{ minHeight: '100vh', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', }}  >

         {
            login ?
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                  <i className="bi bi-person-circle" style={{fontSize:'100px', color:'#6a6a6a'}} ></i>
                  <button className='button-logout' onClick={() => (localStorage.removeItem('token'), window.location.reload())} >Log Out</button>
               </div>
               
               :
               <Form onSubmit={handleSubmit(submit)} style={{ width: '30%', minWidth: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}  > 
                  <div className='isShowUsersDefault' style={{ display: 'flex', scale: isShowUsersDefault ? '1' : '0', opacity: isShowUsersDefault ? '1' : '0'}} >
                     <i className="bi bi-x-lg" onClick={() => setIsShowUsersDefault(false)} style={{ position:'absolute', top:'10px', right:'10px', backgroundColor:'red', borderRadius:'50%', height:'25px', width:'25px', color:'wheat', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }} ></i>
                     <span>You can use these default users</span>
                     <div>
                        <span>Email address</span>
                        <p>prueba@gmail.com </p>
                        <span>Password</span>
                        <p>123456789</p>
                        <br />
                        <span>Email address</span>
                        <p>prueba2@gmail.com</p>
                        <span>Password</span>
                        <p>prueba2</p>
                     </div>

                  </div>
                  <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '100%' }} >
                     <Form.Label>Email address</Form.Label>
                     <Form.Control type="email" placeholder="Enter email" {...register('email')} />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '100%' }}>
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Password" {...register('password')} />
                  </Form.Group>

                  <Button className='button-logout' type="submit" style={{ width: '100%', borderRadius: "0", borderColor: "#6a6a6a" }} >
                     Login
                  </Button>

                  <Link to='/signup' style={{ padding: '30px', color: 'rgb(0, 119, 255)' }} >
                     SignUp
                  </Link>
               </Form>

         }
      </div>
   );
};

export default Login;