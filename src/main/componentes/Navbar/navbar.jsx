import React, { useContext } from 'react';
import { MdNotificationsOff, MdVerifiedUser } from "react-icons/md";
import { AuthContext } from "../../../shared/configs/Authcontext";
import { NavLink,useHistory  } from "react-router-dom";
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
    const history = useHistory();
    const auth = useContext(AuthContext);
    const user = auth.user;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const irPerfil = () => {
        history.push("/perfil"); 
        handleClose();
    };
    
    const irPanel = () => {
        history.push("/panelcuentas"); 
        handleClose();
    };
    return (
        <nav className="navbar">
            <ul className="list">
                <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/venta'>OPERACIONES</NavLink></li>
                {(user.permisos === "MASTER" || user.permisos === "ADMIN") && <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/inventario'>INVENTARIO</NavLink></li>}
                {(user.permisos === "MASTER") && <li className="item"><NavLink className="link-item" activeClassName="link-item-active" to='/reportes'>REPORTES</NavLink></li>}
            </ul>
            <div className="user-section">
           
                <MdVerifiedUser className="username" size="1.1em" color="white" onClick={handleClick}/><label onClick={handleClick}>{user.nombre}</label>
                {(user.permisos === "MASTER" || user.permisos === "ADMIN") &&   <NavLink className="user-links" to="/inventario/alerta">
                    <MdNotificationsOff size="1.1em" color="white" /></NavLink>}
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
                        <ListItemText primary="Mi Perfil" onClick={irPerfil}/>
                        
                                                              
                    </StyledMenuItem>
                    {(user.permisos === "MASTER" || user.permisos === "ADMIN") &&       
                     <StyledMenuItem>
                        <ListItemIcon>
                            <VscExclude />
                        </ListItemIcon>
                        <ListItemText primary="Panel de cuentas" onClick={irPanel} />
                        
                    </StyledMenuItem>}
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