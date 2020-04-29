import React, {useReducer} from "react"
import {PostsContext} from "./PostsContext"
import {PostsReducer} from "./PostsReducer"
import {GET_POSTS, SET_LOADING} from "../types"
import axios from '../../axios/axios-forum'

export const PostsState = ({children}) => {
    const initialState = {
        posts: [],
        loading: true
    }

    const [state, dispatch] = useReducer(PostsReducer, initialState)

    const getPosts = async () => {
        setLoading()

        const posts =  await axios.get('/posts')

        dispatch({
            type: GET_POSTS,
            payload: posts.data
        })
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    return (
        <PostsContext.Provider value={{
            state,
            getPosts, setLoading
        }}>
            {children}
        </PostsContext.Provider>
    )
}