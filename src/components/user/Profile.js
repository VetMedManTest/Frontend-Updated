import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../MetaData';

/**
 * Profile component displays the user's profile information.
 *
 * @returns {JSX.Element} The rendered Profile component.
 */
const Profile = () => {

    const {user,loading, isAuthenticated } = useSelector(state=>state.user)
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate('/login');
        }
    },[navigate,loading,isAuthenticated])


  return <>
   {
    loading ? <Loader /> :<>
     <MetaData title={`${user.name}'s Profile`} />
    <div className="profileContainer">
    <div>
        <h1>My Profile</h1>
        {/* <Avatar style={{backgroundColor:'green'}}>{user.name.charAt(0).toUpperCase()}</Avatar> */}
        <img src={"/Profile.png"} alt={user.name} />
        {/* <Link to="/me/update">Edit Profile</Link> */}
    </div>
    <div>
    <div>
        <h4>Full Name</h4>
        <p>{user.name}</p>
     </div>
    <div>
        <h4>Email</h4>
        <p>{user.email}</p>
    </div>
    <div>
        <h4>Joined On</h4>
        <p>{String(user.createdAt).substr(0, 10)}</p>
    </div>
    <div>
        <Link to="/orders">My Orders</Link>
        <Link to="/password/update">Change Password</Link>
    </div>


    </div>
    </div>
    </>
   }
  </>
}

export default Profile