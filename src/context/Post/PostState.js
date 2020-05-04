import React, { useReducer } from 'react'
import { PostReducer } from './PostReducer'
import { PostContext } from './PostContext'
import {
  ADD_MY_COMMENT,
  GET_COMMENTS_FOR_POST,
  GET_POST,
  SET_COMMENTS_LOADING,
  SET_LOADING,
} from '../types'
import axios from '../../axios/axios-forum'

export const PostState = ({ children }) => {
  const initialState = {
    post: {},
    loading: true,
    comments: [],
    commentsLoading: true,
  }

  const [state, dispatch] = useReducer(PostReducer, initialState)

  const addMyComment = comment => {
    const comments = state.comments

    comments.unshift(comment)

    dispatch({
      type: ADD_MY_COMMENT,
      payload: comments,
    })
  }

  const getPostById = async id => {
    dispatch({ type: SET_LOADING })

    const post = await axios.get(`/posts/${id}`)

    dispatch({
      type: GET_POST,
      payload: post.data,
    })

    getCommentsById(id)
  }

  const getCommentsById = async id => {
    dispatch({ type: SET_COMMENTS_LOADING })

    const comments = await axios.get(`/posts/${id}/comments`)

    dispatch({
      type: GET_COMMENTS_FOR_POST,
      payload: comments.data,
    })
  }

  return (
    <PostContext.Provider
      value={{
        state,
        getPostById,
        addMyComment,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
