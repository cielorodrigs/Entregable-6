import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
   const dispatch = useDispatch();
   const login = localStorage.getItem('token');
   const purchases = useSelector(state => state.purchases);

   useEffect(() => {
      if (purchases.length == 0) {
         dispatch(getPurchasesThunk());
         console.log(purchases);
      };
   }, []);
   const date = purchases?.[0]?.createdAt;
   
   let finalDate = new Date(date);
   console.log(finalDate)
   return (
      <div className='container-product-found' >
         <h2 className='purchases-title'>purchases</h2>
         <ul className='container-purchases-found' >
            {
               purchases.map(purchase => (
                  <li key={purchase.createdAt} className='purchases' >
                     <h2 className='date-purchases' style={{textAlign:"center"}}>{finalDate.toString()}</h2>
                     <div>
                        <ul className='list-purchases'>
                           {purchase.cart.products.map(product => (
                              <li key={product.id} className='purchase' >
                                 <h3>{product.title}</h3>
                                 <div className='container-price-purchase'>
                                    <div className='quantity-cart'>{product.productsInCart.quantity}</div>
                                    <h5>$ {Number(product.price) * product.productsInCart.quantity}</h5>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </li>
               ))
            }
         </ul>
      </div>
   );
};

export default Purchases;