import React, {  useState } from 'react'
import { MdLock, MdLockOpen } from 'react-icons/md'
import "./ResetPassword.css"
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from 'react-alert'
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import MetaData from '../MetaData';
import { clearErrors, resetPassword } from '../../actions/userAction';


/**
 * ResetPassword component allows users to reset their password using a token.
 *
 * @returns {JSX.Element} The rendered ResetPassword component.
 */

const ResetPassword = () => {
  const {token} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
    };
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
        navigate("/login");
      }
    }, [dispatch, error, alert,navigate , success,token]);
  
  
  return <>
    {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
  </>
}


export default ResetPassword;