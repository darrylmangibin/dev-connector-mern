import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

// get current profile

export const getCurrentProfile = () => {
  return (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
      .then((res) => {
        console.log(res)
        return dispatch({
          type: GET_PROFILE,
          payload: res.data
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

export const createProfile = (profileData, history) => {
  return (dispatch) => {
    axios.post('/api/profile', profileData)
      .then((res) => {
        return history.push('/dashboard')
      })
      .catch((err) => {
        return dispatch({
          type: GET_ERRORS,
          payload:err.response.data
        })
      })
  }
}

export const addExperience = (expData, history) => {
  return (dispatch) => {
    axios.post('/api/profile/experience', expData)
      .then((res) => {
        return history.push('/dashboard')
      })
      .catch((err) => {
        return dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const addEducation = (eduData, history) => {
  return (dispatch) => {
    axios.post('/api/profile/education', eduData)
      .then((res) => {
        return history.push('/dashboard')
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const deleteAccount = () => {
  return (dispatch) => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
      axios.delete('/api/profile')
        .then((res) => {
          return dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        })
        .catch((err) => {
          return dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        })
    }
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