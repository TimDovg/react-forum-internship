import React, { useContext, useState } from 'react'
import is from 'is_js'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../context/Auth/AuthContext'

const API_KEY = process.env.REACT_APP_API_KEY

const createUrl = type => {
  switch (type) {
    case 'SIGN_IN':
      return `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    case 'SIGN_UP':
      return `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
  }
}

const Auth = props => {
  const initialState = {
    email: '',
    password: '',
    valid: true,
  }

  const [state, setState] = useState(initialState)
  const { setEmail, setToken, setAdmin } = useContext(AuthContext)

  const onEmailHandler = ({ target: { value } }) =>
    setState({ ...state, email: value })

  const onPasswordHandler = ({ target: { value } }) =>
    setState({ ...state, password: value })

  const onAuthorizationHandler = async type => {
    const email = state.email.trim()
    const password = state.password.trim()

    // admin root
    if (
      process.env.REACT_APP_ADMIN_LOGIN === email &&
      process.env.REACT_APP_ADMIN_PASSWORD === password
    ) {
      setToken('admin')
      setEmail('admin')
      setAdmin()
      props.history.push('/my-info')
      return
    }

    const url = createUrl(type)

    if (!password.trim() || !is.email(email.trim())) {
      return setState({ ...state, valid: false })
    }

    // ok
    const user = {
      email,
      password,
      returnSecureToken: true,
    }

    try {
      const response = await axios.post(url, user)

      setToken(response.data.idToken)
      setEmail(response.data.email)

      setState(initialState)

      props.history.push('/my-info')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="m-4-5">
      <h5 className="text-center">Пожалуйста, авторизируйтесь!</h5>

      <label htmlFor="forEmail">
        Email<span className="text-danger">*</span>
      </label>
      <input
        id="forEmail"
        className="form-control"
        value={state.email}
        onChange={onEmailHandler}
      />

      <label htmlFor="forPassword" className="mt-3">
        Пароль<span className="text-danger">*</span>
      </label>
      <input
        type="password"
        id="forPassword"
        className="form-control"
        value={state.password}
        onChange={onPasswordHandler}
      />

      <div className="d-flex justify-content-end">
        {!state.valid && (
          <small className="text-danger mr-auto mt-3">
            Введите корректно данные!
          </small>
        )}
        <button
          onClick={onAuthorizationHandler.bind(this, 'SIGN_UP')}
          className="btn btn-dark mt-3 mr-3"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
        <button
          onClick={onAuthorizationHandler.bind(this, 'SIGN_IN')}
          className="btn btn-dark mt-3"
        >
          ВОЙТИ
        </button>
      </div>
    </div>
  )
}

export default withRouter(Auth)
