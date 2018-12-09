import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

//GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(e => dispatch({ type: GET_PROFILE, payload: {} }));
};

//PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//PROFILE CREATION
export const createProfile = (data, history) => dispatch => {
  axios
    .post('/api/profile', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//CLEAR PROFILE
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
