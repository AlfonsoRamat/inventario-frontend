import React, { useContext } from 'react';
import { MdNotificationsOff, MdVerifiedUser } from "react-icons/md";
import { AuthContext } from "../../../shared/configs/Authcontext";
import { NavLink } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { VscAccount, VscSignOut, VscExclude } from "react-icons/vsc";
import { withStyles } from '@material-ui/core/styles';
import './navbar.css';
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.secondary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function Navbar(props) {

    const auth = useContext(AuthContext);
    const user = auth.user;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/venta'>OPERACIONES</NavLink></li>
                {(user.permisos === "MASTER" || user.permisos === "ADMIN") && <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/inventario'>INVENTARIO</NavLink></li>}
                {(user.permisos === "MASTER") && <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/reportes'>REPORTES</NavLink></li>}
            </ul>
            <div className="user-section">
                <NavLink className="user-links" to="/notifications"><MdNotificationsOff size="1.1em" color="white" /></NavLink>
                <NavLink className="user-links" onClick={handleClick} to="/details"><MdVerifiedUser className="username" size="1.1em" color="white" />{user.nombre}</NavLink>

                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <VscAccount />
                        </ListItemIcon>
                        <ListItemText  >
                        <NavLink  to='/inventario'>INVENTARIO</NavLink>
                        </ListItemText>
                                           
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <VscExclude />
                        </ListItemIcon>
                        <ListItemText primary="Panel de cuentas" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <VscSignOut />
                        </ListItemIcon>
                        <ListItemText primary="salir" onClick={() => auth.signOut()} />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        </nav>
    );
}

export default Navbar;