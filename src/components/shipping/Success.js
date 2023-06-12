import React from 'react'
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdCheckCircle } from 'react-icons/md';

/**
 * Success component displays a success message after placing an order.
 *
 * @returns {JSX.Element} The rendered Success component.
 */
const Success = () => {
  return (
    <div className="orderSuccess">
      <MdCheckCircle />

      <Typography>Your Order has been Placed successfully !
      </Typography>
     
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default Success