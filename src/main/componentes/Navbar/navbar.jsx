import React, { useContext } from 'react';
import { MdNotificationsOff, MdVerifiedUser } from "react-icons/md";
import { AuthContext } from "../../../shared/configs/Authcontext";
import { NavLink } from "react-router-dom";
import './navbar.css';

function Navbar(props) {

    const auth = useContext(AuthContext);
    const user = auth.user;
    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/venta'>OPERACIONES</NavLink></li>
                {(user.permisos === "MASTER" || user.permisos === "ADMIN") && <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/inventario'>INVENTARIO</NavLink></li>}
                {(user.permisos === "MASTER") && <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/reportes'>REPORTES</NavLink></li>}
            </ul>
            <div className="user-section">
                <NavLink className="user-links" to="/notifications"><MdNotificationsOff size="1.1em" color="white" /></NavLink>
                <NavLink className="user-links" onClick={()=> auth.signOut()} to="/details"><MdVerifiedUser className="username" size="1.1em" color="white" />{user.nombre}</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;