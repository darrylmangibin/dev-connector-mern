import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// register user
export const registerUser = (userData, history) => {
  return (dispatch) => {
    axios.post('/api/users/register', userData)
      .then((res) => {
        return history.push('/login')
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload:err.response.data
        })
    })
  }
}

// login get user token
export const loginUser = (userData) => {
  return (dispatch) => {
    axios.post('/api/users/login', userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token)
        setAuthToken(token)
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded))
      })
      .catch((err) => {
        return dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }
}