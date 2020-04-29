import React, {useReducer} from "react"
import {PostReducer} from "./PostReducer"
import {PostContext} from "./PostContext"
import {GET_COMMENTS_FOR_POST, GET_POST, SET_COMMENTS_LOADING, SET_LOADING} from "../types"
import axios from "../../axios/axios-forum"

export const PostState = ({children}) => {
    const initialState = {
        post: {},
        loading: true,
        commentsLoading: true
    }

    const [state, dispatch] = useReducer(PostReducer, initialState)

    const getPostById = async id => {
        dispatch({type: SET_LOADING})

        const post = await axios.get(`/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: post.data
        })

        getCommentsById(id)
    }

    const getCommentsById = async id => {
        dispatch({type: SET_COMMENTS_LOADING})

        const comments = await axios.get(`/posts/${id}/comments`)

        dispatch({
            type: GET_COMMENTS_FOR_POST,
            payload: comments.data
        })
    }

    return (
        <PostContext.Provider value={{
            state, getPostById
        }}>
            {children}
        </PostContext.Provider>
    )
}
