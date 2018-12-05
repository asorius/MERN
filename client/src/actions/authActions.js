import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//Register

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
};

//Login

export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save token to local storage
      const { token } = res.data;
      localStorage.setItem('token', token);
      //set token to the auth axios header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    paylaod: decoded
  };
};
//   try {
//     const response = await fetch('/api/users/register', {
//       method: 'POST',
//       body: JSON.stringify(userData),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const newUser = await response.json();
//   } catch (e) {
//     dispatch({ type: GET_ERRORS, payload: e.response.data });
//   }
