import React, { useContext } from 'react'
import Auth from '../../components/Auth/Auth'
import MyProfile from '../../components/MyProfile/MyProfile'
import { AuthContext } from '../../context/Auth/AuthContext'

const MyInfo = () => {
  const { state: authState } = useContext(AuthContext)

  return authState.token ? <MyProfile /> : <Auth />
}

export default MyInfo
