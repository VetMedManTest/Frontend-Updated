import React, { useState } from 'react'
import './userOption.css'
import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import { MdDashboard, MdExitToApp, MdListAlt, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { CgShoppingCart } from 'react-icons/cg';
import { logout } from '../../actions/userAction';

/**
 * UserOptions component displays a set of user options in a menu.
 *
 * @component
 * @param {Object} user - The user object containing user information.
 * @returns {JSX.Element} - The UserOptions component.
 */


const UserOptions = ({user}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const alert = useAlert();
    const {cartItems } =  useSelector((state)=> state.cart);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        {
            icon: <MdListAlt />,
            name: "Orders", 
            func:orders
        },
        {
            icon: <MdPerson />,
            name: "Profile", 
            func:account
        },
        {
            icon: <CgShoppingCart style={{color: cartItems.length >0 ? "green" : "unset"}} />,
            name: `Cart (${cartItems.length})`, 
            func:cart
        },
        {
            icon: <MdExitToApp />,
            name: "Logout", 
            func:logoutUser
        },  
    ];

    if(user.role === 'admin'){
        options.unshift({
            icon: <MdDashboard />,
            name:"Dashboard",
            func:dashboard,
        })
    }

    function dashboard(){
        navigate('/admin/dashboard');
    }

    function orders(){
        navigate('/orders');
    }

    function account(){
        navigate('/profile');
    }

    function cart(){
        navigate('/cart')
    }

    function logoutUser(){
        dispatch(logout())
        alert.success("Logout Successfully")
    }

    return (
        <>
            <IconButton
                onClick={handleClick}
                className="user-options"
                aria-label="user-options"
                aria-controls="user-options-menu"
                aria-haspopup="true"
                color="inherit"
                style={{ position: 'relative' }}
            >
                <Avatar style={{backgroundColor:'green'}}>{user.name.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
                id="user-options-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                {options.map((option) => (
                    <MenuItem key={option.name} onClick={option.func}>
                        {option.icon}&nbsp;&nbsp;{option.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default UserOptions;
