import React from "react";
import {NavLink} from 'react-router-dom';

const Navigation = () => {

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="navbar-brand cursor-default font-italic">
                IT Forum
            </div>
            <ul className="navbar-nav w-100">
                <li className="nav-item">
                    <NavLink exact to="/" className="nav-link">Все посы</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/all-users" className="nav-link">Все пользователи</NavLink>
                </li>
                <div className="d-flex ml-auto">
                    <li className="nav-item">
                        <NavLink to="/my-info" className="nav-link">Мой кабинет</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create-post" className="nav-link">Создать пост</NavLink>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default Navigation;