import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import {
  CLEAR_ALL_STATE,
  REMOVE_ADMIN,
  REMOVE_EMAIL,
  REMOVE_TOKEN,
  SET_ADMIN,
  SET_EMAIL,
  SET_TOKEN,
} from '../types'
import { AuthReducer } from './AuthReducer'

export const AuthState = ({ children }) => {
  const initialState = {
    token: false,
    admin: false,
    email: false,
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const setToken = token => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    })
  }

  const removeToken = () => dispatch({ type: REMOVE_TOKEN })

  const setAdmin = () => dispatch({ type: SET_ADMIN })

  const removeAdmin = () => dispatch({ type: REMOVE_ADMIN })

  const setEmail = email =>
    dispatch({
      type: SET_EMAIL,
      payload: email,
    })

  const removeEmail = () => dispatch({ type: REMOVE_EMAIL })

  const clearAllState = () =>
    dispatch({
      type: CLEAR_ALL_STATE,
      payload: initialState,
    })

  return (
    <AuthContext.Provider
      value={{
        state,
        setToken,
        removeToken,
        setAdmin,
        removeAdmin,
        setEmail,
        removeEmail,
        clearAllState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
