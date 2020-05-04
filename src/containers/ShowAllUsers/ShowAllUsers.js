import React, { useContext, useEffect, useState } from 'react'
import { Loader } from '../../components/Loader/Loader'
import { UsersContext } from '../../context/Users/UsersContext'
import { Link } from 'react-router-dom'

const ShowAllUsers = ({ history }) => {
  const { state: usersState, getUsers } = useContext(UsersContext)

  const initialState = {
    searchValue: '',
    usersForSearching: [],
  }

  const [state, setState] = useState(initialState)

  const onSearchHandler = ({ target: { value } }) => {
    const re = new RegExp(value, 'i')
    const usersForSearching = usersState.users.filter(user =>
      re.test(user.name),
    )

    setState({ ...state, searchValue: value, usersForSearching })
  }

  useEffect(() => {
    getUsers()
    // важно! для отображение начального состояния
    if (!state.usersForSearching.length && !state.searchValue) {
      setState({ ...state, usersForSearching: usersState.users })
    }
  }, [])

  return (
    <>
      {usersState.loading ? (
        <Loader />
      ) : (
        <div className="m-4-5">
          <label htmlFor="forSearch" className="font-weight-bold">
            Найти пользователя:{' '}
          </label>
          <input
            onChange={onSearchHandler}
            value={state.searchValue}
            id="forSearch"
            className="form-control w-35 d-inline ml-3"
            placeholder="Введите имя пользователя..."
          />

          <small className="mt-3 d-block">
            Найдено пользователей:{' '}
            <strong>{state.usersForSearching.length}</strong>
          </small>

          {state.usersForSearching.map((user, index) => (
            <div className="card mt-3" key={index}>
              <div className="card-body d-flex align-items-center">
                <div>{user.name}</div>
                <div className="ml-auto">
                  <Link to={`${history.location.pathname}/${user.id}`}>
                    <button className="btn btn-dark">РЕДАКТИРОВАТЬ</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ShowAllUsers
