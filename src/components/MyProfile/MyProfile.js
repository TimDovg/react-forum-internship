import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { withRouter } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import axios from '../../axios/axios-forum'

const MyProfile = ({ history }) => {
  const { state: authState, clearAllState } = useContext(AuthContext)

  const initialState = {
    loading: false,
    edit: false,
    valid: true,
    name: '',
    email: authState.email || '',
    password: '',
  }

  const [state, setState] = useState(initialState)

  const onEditHandler = () => setState({ ...state, edit: true })

  const onNameHandler = ({ target: { value } }) =>
    setState({ ...state, name: value })

  const onEmailHandler = ({ target: { value } }) =>
    setState({ ...state, email: value })

  const onPasswordHandler = ({ target: { value } }) =>
    setState({ ...state, password: value })

  const changeInfo = async () => {
    const password = state.password.trim()
    const email = state.email.trim()
    const name = state.name.trim()

    if (!password || !email || !name) {
      return setState({ ...state, valid: false })
    }

    // ok
    const user = {
      password,
      name,
      email,
    }

    try {
      setState({ ...state, loading: true })

      const response = await axios.post('/posts', user)

      console.log('STATUS:', response.status)

      setState(initialState)
    } catch (e) {
      console.log(e)
    }
  }

  const onSignOutHandler = () => {
    clearAllState()

    history.push('/')
  }

  return (
    <div className="m-4-5 text-center">
      {!state.edit ? (
        <>
          <button onClick={onEditHandler} className="btn btn-dark">
            РЕДАКТИРОВАТЬ ИНФОРМАЦИЮ
          </button>
          <br />
        </>
      ) : (
        <div className="text-justify">
          <label htmlFor="forName">
            Name<span className="text-danger">*</span>
          </label>
          <input
            onChange={onNameHandler}
            value={state.name}
            id="forName"
            className="form-control"
          />

          <label htmlFor="forEmail" className="mt-3">
            Email<span className="text-danger">*</span>
          </label>
          <input
            onChange={onEmailHandler}
            value={state.email}
            id="forEmail"
            className="form-control"
          />

          <label htmlFor="forPassword" className="mt-3">
            Password<span className="text-danger">*</span>
          </label>
          <input
            onChange={onPasswordHandler}
            value={state.password}
            type="password"
            id="forPassword"
            className="form-control"
          />

          <div className="d-flex justify-content-end">
            {!state.valid ? (
              <small className="text-danger mr-auto mt-3">
                Заполните все поля!
              </small>
            ) : null}
            <button onClick={changeInfo} className="btn btn-dark mt-3">
              РЕДАКТИРОВАТЬ
            </button>
          </div>
        </div>
      )}
      <button onClick={onSignOutHandler} className="btn btn-dark mt-3">
        ВЫЙТИ
      </button>
      {state.loading ? <Loader /> : null}
    </div>
  )
}

export default withRouter(MyProfile)
