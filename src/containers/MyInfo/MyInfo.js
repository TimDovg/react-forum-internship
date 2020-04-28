import React from "react";

const MyInfo = () => {
    console.log('DATA: ', process.env.REACT_APP_ADMIN_LOGIN, process.env.REACT_APP_ADMIN_PASSWORD)

    return (
        <h1>MyInfo</h1>
    )
}

export default MyInfo;