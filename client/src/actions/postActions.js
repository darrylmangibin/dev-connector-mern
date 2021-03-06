import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from './types';

export const addPost = (postData) => {
  return (dispatch) => {
    dispatch(clearErrors())
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

export const getPost = (id) => {
  return (dispatch) => {
    dispatch(setPostLoading())
    axios.get(`/api/posts/${id}`)
      .then((res) => {
        return dispatch({
          type: GET_POST,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_POST,
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

export const addLike = (id) => {
  return (dispatch) => {
    axios.post(`/api/posts/like/${id}`)
      .then((res) => {
        return dispatch(getPosts())
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const removeLike = (id) => {
  return (dispatch) => {
    axios.post(`/api/posts/unlike/${id}`)
      .then((res) => {
        return dispatch(getPosts())
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const addComment = (postId, commentData) => {
  return (dispatch) => {
    dispatch(clearErrors())
    axios.post(`/api/posts/comment/${postId}`, commentData)
      .then((res) => {
        return dispatch({
          type: GET_POST,
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

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
      .then((res) => {
        return dispatch({
          type: GET_POST,
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


export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}