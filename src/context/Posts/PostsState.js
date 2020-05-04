import React, { useReducer } from 'react'
import { PostsContext } from './PostsContext'
import { PostsReducer } from './PostsReducer'
import {
  GET_POSTS,
  REMOVE_LOADING,
  SET_LOADING,
  SET_POSTS_FOR_SEARCHING,
} from '../types'
import axios from '../../axios/axios-forum'

export const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    postsForSearching: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(PostsReducer, initialState)

  const addMyPost = async post => {
    setLoading()

    const response = await axios.post('/posts', post)

    removeLoading()

    return response
  }

  const getPosts = async () => {
    setLoading()

    const posts = await axios.get('/posts')

    dispatch({
      type: GET_POSTS,
      payload: posts.data,
    })
  }

  const setLoading = () => dispatch({ type: SET_LOADING })

  const removeLoading = () => dispatch({ type: REMOVE_LOADING })

  const setPostsForSearching = posts =>
    dispatch({
      type: SET_POSTS_FOR_SEARCHING,
      payload: posts,
    })

  return (
    <PostsContext.Provider
      value={{
        state,
        getPosts,
        setLoading,
        setPostsForSearching,
        addMyPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
