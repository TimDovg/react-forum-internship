import React, { useEffect, useState } from 'react'
import axios from '../../axios/axios-forum'
import { Loader } from '../Loader/Loader'

const Album = ({ match }) => {
  const albumNumber = match.params.albumNumber

  const initialState = {
    loading: true,
    photos: [],
  }

  const [state, setState] = useState(initialState)

  const getPhotos = async () => {
    const photos = await axios.get(`albums/${albumNumber}/photos`)

    setState({ ...state, photos: photos.data, loading: false })
  }

  useEffect(() => {
    getPhotos()
  }, [])

  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
        <div className="row pr-1 w-100 justify-content-center">
          {state.photos.map((photo, index) => (
            <div key={index} className="card m-3" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={photo.thumbnailUrl}
                alt={`photoId: ${photo.id}`}
              />
              <div className="card-body">
                <p className="card-text text-center">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Album
