import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../../context/Auth/AuthContext"
import {UsersContext} from "../../context/Users/UsersContext"
import axios from "../../axios/axios-forum"
import {Loader} from "../Loader/Loader"

const EditUser = ({history}) => {
    const {state: authState} = useContext(AuthContext)
    const {state: usersState, getUsers} = useContext(UsersContext)

    const userId = history.location.pathname.split('/')[history.location.pathname.split('/').length - 1]
    const user = usersState.users[userId - 1]

    if (!authState.admin) history.push('/')

    useEffect(() => {
        getUsers()
    }, [])

    const initialState = {
        loading: false,
        edited: false
    }

    const [state, setState] = useState(initialState)

    const sendInfo = async () => {
        setState({...state, loading: true, edited: true})

        await axios.post('/posts')

        setState(initialState)
    }

    return (
        <>
            {!user
                ? null
                : <div className="m-4-5 d-flex">
                    <div className="w-50">
                        <label>id</label>
                        <input defaultValue={user.id} className="form-control w-50"/>

                        <label className="mt-3">name</label>
                        <input defaultValue={user.name} className="form-control w-50"/>

                        <label className="mt-3">username</label>
                        <input defaultValue={user.username} className="form-control w-50"/>

                        <label className="mt-3">email</label>
                        <input defaultValue={user.email} className="form-control w-50"/>

                        <label className="mt-3">street</label>
                        <input defaultValue={user.address.street} className="form-control w-50"/>

                        <label className="mt-3">suite</label>
                        <input defaultValue={user.address.suite} className="form-control w-50"/>

                        <label className="mt-3">city</label>
                        <input defaultValue={user.address.city} className="form-control w-50"/>
                    </div>
                    <div className="w-50">
                        <label>zipcode</label>
                        <input defaultValue={user.address.zipcode} className="form-control w-50"/>

                        <label className="mt-3">phone</label>
                        <input defaultValue={user.phone} className="form-control w-50"/>

                        <label className="mt-3">website</label>
                        <input defaultValue={user.website} className="form-control w-50"/>

                        <label className="mt-3">company name</label>
                        <input defaultValue={user.company.name} className="form-control w-50"/>

                        <label className="mt-3">company catchPhrase</label>
                        <input defaultValue={user.company.catchPhrase} className="form-control w-50"/>

                        <label className="mt-3">company bs</label>
                        <input defaultValue={user.company.bs} className="form-control w-50"/>

                        <button onClick={sendInfo} className="btn btn-dark mt-3">РЕДАКТИРОВАТЬ</button>

                        {state.edited
                            ? <small className="ml-5 text-success">done</small>
                            : null
                        }

                        {state.loading
                            ? <Loader/>
                            : null
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default EditUser
