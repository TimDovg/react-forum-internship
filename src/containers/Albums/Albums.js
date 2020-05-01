import React, {useContext, useEffect, useState} from "react"
import axios from "../../axios/axios-forum"
import {Loader} from "../../components/Loader/Loader"
import {UsersContext} from "../../context/Users/UsersContext"
import {Link} from "react-router-dom"

export const Albums = ({match}) => {
    // хороший подход, запомнить!
    const initialState = {
        loading: true,
        albums: [],
        filterAlbums: [],
        searchValue: ''
    }

    const [state, setState] = useState(initialState)
    const {state: {UserIdUserName}, getUsers} = useContext(UsersContext)

    const getAlbums = async () => {
        const albums = await axios.get('/albums')
        setState({...state, albums: albums.data, filterAlbums: albums.data, loading: false})
    }

    useEffect(() => {
        getAlbums()
        getUsers()
    }, [])

    const onSearchHandler = ({target: {value}}) => {
        const re = new RegExp(value, 'i')
        const filterAlbums = state.albums.filter(album => re.test(UserIdUserName[album.userId]))

        setState({...state, searchValue: value, filterAlbums})
    }

    return (
        <>
            <label htmlFor="forSearch" className="font-weight-bold ml-4-5 mt-3">Поиск: </label>
            <input
                onChange={onSearchHandler}
                value={state.searchValue}
                id="forSearch"
                placeholder="Введите имя пользователя..."
                className="form-control d-inline w-25 ml-3 mt-3"
            />
            <small className="d-block ml-4-5 mt-2">Найдено альбомов: <strong>{state.filterAlbums.length}</strong></small>

            {state.loading
                ? <Loader/>
                : <div className="row pr-1 pl-35 w-100 mt-4">
                    {state.filterAlbums.map((album, index) => (
                        <div key={index} className="col-sm-3 mb-4">
                            <div className="card bg-dark text-white">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{album.title.toUpperCase()}</h5>
                                    <p className="font-italic text-secondary">Автор: {UserIdUserName[album.userId]}</p>
                                    <Link to={`${match.url}/${album.id}`}
                                          className="btn btn-primary ml-5 mr-5">ПОСМОТРЕТЬ</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
