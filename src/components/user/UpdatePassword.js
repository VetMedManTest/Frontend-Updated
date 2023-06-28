import React, {  useState } from 'react'
import { MdLock, MdLockOpen, MdVpnKey } from 'react-icons/md'
import "./UpdatePassword.css"
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import { useEffect } from 'react';
import { clearErrors, updatePassword } from '../../actions/userAction';
import MetaData from '../MetaData';
import Loader from '../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

/**
 * UpdatePassword component allows users to update their password.
 *
 * @returns {JSX.Element} The rendered UpdatePassword component.
 */
const UpdatePassword = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.updatePassword);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

    const updatePasswordSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
    }


      useEffect(()=>{

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (isUpdated) {
          alert.success("Password changed Successfully");

    
          navigate("/profile");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
       
      },[dispatch,navigate,alert,error,isUpdated])
    

  return <>
    {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
  </>
}

export default UpdatePassword