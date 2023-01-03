import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

   // const [ indexSliderImage, setIndexSliderImage ] = useState(1);

   return (
      <li className='productCard' >
            <div className='container-image-product' >
               <img
                  
                  // onMouseEnter={()=>{
                  //    setIndexSliderImage(0);
                  // }}
                  // onMouseLeave={()=>{
                  //    setIndexSliderImage(1);
                  // }}

                  className='image-product-1'

                  src={product.productImgs[0]} 
                  alt="" 
               />

               <img
                  className='image-product-2'
                  src={product.productImgs[1]} 
                  alt="" 
               />

            </div>
            <div className='container-information-product' >
               <h3>{product.title}</h3>
               <span>Price</span>
               <h4>{product.price}</h4>
            </div>
         
         <Link to={`/product/${product.id}`}>
         <i className="bi bi-cart2"></i>
         </Link>
      </li>
   );
};

export default ProductCard;