import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import MetaData from "../MetaData";
import { clearErrors, createOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { resetCart } from "../../actions/cartAction";

const ConfirmOrder = () => {
    const { shippingInfo, billingInfo,cartItems } = useSelector((state) => state.cart);
   // const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state)=> state.newOrder);

    const navigate = useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      //ask about shipping charges criteria 
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
      const tax = subtotal * 0.18;
      const totalPrice = subtotal + tax + shippingCharges;
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert,navigate]);
    

      //user order 
      //const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

      
    //   const order = {
    //     shippingInfo,
    //     orderItems:cartItems,
    //     itemPrice: orderInfo.subtotal,
    //     taxPrice:orderInfo.tax,
    //     shippingPrice: orderInfo.shippingCharges,
    //     totalPrice:orderInfo.totalPrice
    //   }

      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
           const order = {
        shippingInfo,
        billingInfo,
        orderItems:cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
      }

        dispatch(createOrder(order))
        dispatch(resetCart())
        navigate("/success");
      };



  return <>
        <MetaData title="Confirm Order" />

        <CheckoutSteps activeStep={2} />

        <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography className="shipping-info-heading">Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{shippingInfo.fname} {" "} {shippingInfo.lname}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
              
              {/* confirm order */}
            <button onClick={proceedToPayment}>Confirm Order</button>
          </div>
        </div>
      </div>
  </>
}

export default ConfirmOrder