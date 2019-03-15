import axios from 'axios';

import { ADD_POST, GET_ERRORS }  from './types';

export const addPost = (postData) => {
  return (dispatch) => {
    axios.post('/api/posts', postData)
      .then((res) => {
        return dispatch({
          type: ADD_POST,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}