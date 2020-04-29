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
                    <NavLink to="/posts" className="nav-link">Все посты</NavLink>
                </li>
                <div className="d-flex ml-auto">
                    <li className="nav-item">
                        <NavLink to="/my-info" className="nav-link">Мой кабинет</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/all-users" className="nav-link">Редактировать пользователей</NavLink>
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