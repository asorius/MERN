import {
  GET_PROFILE,
  GET_ERRORS,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
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

//CLEAR PROFILE
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
