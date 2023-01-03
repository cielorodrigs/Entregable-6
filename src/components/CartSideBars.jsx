import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkoutThunk, getCartSide, removeProductCartThunk } from '../store/slices/cartSideBar.slice';

const CartSideBars = ({ show, handleClose, setShow }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ totalPrice, setTotalPrice] = useState(0);

  const cartSide = useSelector(state => state.cart);

  useEffect(() => {

    if(cartSide.length === 0){
      dispatch(getCartSide());
    }

    var totalPices = 0;

    for(let i of cartSide){
      totalPices = totalPices + Number(i.price)* i.productsInCart.quantity
    }

    setTotalPrice(totalPices)
  },[]);


  return (
    <Offcanvas show={show} onHide={handleClose} placement='end' >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{position:'relative'}} >
        <ul className='container-cart-product' >
          {
            cartSide.map(product => (
              <li key={product.id} className='product-in-cart' >
                <Link to={`/product/${product.id}`} onClick={() => setShow(false)} >
                  <i className="bi bi-trash3-fill" onClick={() => dispatch(removeProductCartThunk(product.id))} ></i>
                  <h4>{product.title}</h4>
                </Link>
                <div className='quantity-cart'>{product.productsInCart.quantity}</div>
                <div className='total-cart-product' >
                  <span>Total</span>
                  <h5>$ {Number(product.price)*product.productsInCart.quantity}</h5>
                </div>
              </li>
            ))
          }
        </ul>

        <div className='container-total-price'>
          <div>
            <span>Total</span>
            <p>$ {totalPrice}</p>
          </div>
          <Button 
            className='button-logout' 
            onClick={() => ( cartSide.length !== 0 && dispatch(checkoutThunk()), cartSide.length !== 0 && navigate('/purchases') ) } 
            style={{width:'100%', borderRadius: "0"}}
          >
              Checkout
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSideBars;