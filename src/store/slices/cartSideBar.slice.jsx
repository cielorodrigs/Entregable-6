import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSideBarSlice = createSlice({
  name: 'cartSideBarSideSlice',
  initialState: [],
  reducers: {
    setCartsSide: (state, action) => {
      return action.payload;
    }
  }
});


export const getCartSide = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
    .then((res) => dispatch(setCartsSide(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const addToCartThunk = (add) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', add, getConfig())
    .then(() => dispatch(getCartSide()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const checkoutThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
    .then((res) =>  dispatch(setCartsSide([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const removeProductCartThunk = (productId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${productId}`, getConfig())
        .then((res) => dispatch(getCartSide()))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setCartsSide } = cartSideBarSlice.actions;

export default cartSideBarSlice.reducer;
