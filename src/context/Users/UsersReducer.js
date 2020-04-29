import {GET_USERS, SET_LOADING, SET_USER_ID_USER_NAME} from "../types";

const handlers = {
    [GET_USERS]: (state, {payload}) => ({...state, users: payload, loading: false}),
    [SET_LOADING]: state => ({...state, loading: true}),
    [SET_USER_ID_USER_NAME]: (state, {payload}) => ({...state, UserIdUserName: payload}),
    DEFAULT: state => state
}

export const UsersReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}