import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// get current profile

export const getCurrentProfile = () => {
  return (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
      .then((res) => {
        console.log(res)
        return dispatch({
          type: GET_PROFILE,
          payload: res
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      })
  }
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}