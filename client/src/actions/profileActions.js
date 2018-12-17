import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
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

//GET PROFILE BY HANDLE
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(e => dispatch({ type: GET_PROFILE, payload: null }));
};

//GET ALL PROFILES
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
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

//ADD EXPERIENCE
export const addExperience = (data, history) => dispatch => {
  axios
    .post('/api/profile/experience', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//ADD EDUCATION
export const addEducation = (data, history) => dispatch => {
  axios
    .post('/api/profile/education', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE EXPERIENCE
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE EDUCATION
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE PROFILE
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure You want to delete?')) {
    axios
      .delete('/api/profile')
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(e => dispatch({ type: GET_ERRORS, payload: e.response.data }));
  }
};
//CLEAR PROFILE
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
