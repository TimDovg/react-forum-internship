import React, {useReducer} from "react"
import {UsersReducer} from "./UsersReducer";
import {GET_USERS, SET_LOADING, SET_USER_ID_USER_NAME} from "../types";
import axios from "../../axios/axios-forum"
import {UsersContext} from "./UsersContext";

export const UsersState = ({children}) => {
    const initialState = {
        users: [],
        loading: true,
        UserIdUserName: {}
    }

    const [state, dispatch] = useReducer(UsersReducer, initialState)

    const getUsers = async () => {
        setLoading()

        const users = await axios.get('/users')

        // создаем объект для быстрого доступа к UserName
        const UserIdUserName = {}
        users.data.forEach(user => UserIdUserName[user.id] = user.username)
        dispatch({
            type: SET_USER_ID_USER_NAME,
            payload: UserIdUserName
        })

        dispatch({
            type: GET_USERS,
            payload: users.data
        })
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    return (
     <UsersContext.Provider value={{
         state,
         getUsers
     }}>
         {children}
     </UsersContext.Provider>
    )
}