import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST }  from './types';

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

export const getPosts = () => {
  return (dispatch) => {
    dispatch(setPostLoading())
    axios.get('/api/posts')
      .then((res) => {
        return dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      })
  }
}

export const deletePost = (id) => {
  return (dispatch) => {
    axios.delete(`/api/posts/${id}`)
      .then((res) => {
        return dispatch({
          type: DELETE_POST,
          payload: id
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

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}