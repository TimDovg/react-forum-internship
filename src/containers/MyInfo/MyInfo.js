import React, {useContext} from "react"
import Auth from "../../components/Auth/Auth"
import MyProfile from "../../components/MyProfile/MyProfile"
import {AuthContext} from "../../context/Auth/AuthContext"

const MyInfo = () => {
    const {state: authState} = useContext(AuthContext)

    if (authState.token) {
        return (
            <MyProfile/>
        )
    } else {
        return (
            <Auth/>
        )
    }
}

export default MyInfo
