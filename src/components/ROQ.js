import React, {useState,useReducer} from 'react';
import {Button, Modal} from '@mui/material';
import './ROQ.css'
import axios from "axios";
import { API_URL } from '../api';
import {
  Typography,TextField
} from "@material-ui/core"
const ROQModel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      user: "",
      qty: "",
      time:"",
      rdate:"",
      details:"",
      descp:"",
      address:"",
      phone:"",
      email:"",
    }
  );
  const handleSubmit = evt => {
    evt.preventDefault();
    let data={
      endUser:formInput['user'],
      qty:Number(formInput['qty']),
      leadTime:formInput['time'],
      responseDate:formInput["rdate"],
      additionalInformation:formInput['details'],
      description:formInput['descp'],
      address:formInput['address'],
      phoneNumber:formInput['phone'],
      email:formInput['email']
    }
    console.log(data);
    handleClose();
    axios.post(
      `${API_URL}/api/v1/rfq`,
          data,
    )
    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(response => console.log("Success:", JSON.stringify(response)))
    //   .catch(error => console.error("Error:", error));
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };


  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
 <Button variant="contained" style={{maxWidth: '10vh', maxHeight: '10vh', minWidth: '7vh', minHeight: '7vh',borderRadius:"50%",position:'fixed',bottom:"20vh",right:"5vw",background:"green",zIndex:"2"}} onClick={handleOpen}><svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M45.0179 14.9705C44.5017 13.5552 43.644 12.5347 42.5371 12.0208L42.5222 12.0143C42.0183 11.7867 41.4819 11.6702 40.9408 11.6709H40.8813C38.3474 11.7149 35.7605 14.199 34.4451 17.8526C33.4805 20.5244 33.3698 23.398 34.1493 25.5397C34.6647 26.9561 35.5242 27.9766 36.6358 28.4905L36.6479 28.4959C37.1518 28.7234 37.6882 28.8398 38.2293 28.8393C40.7873 28.8393 43.4012 26.3552 44.7407 22.6533C45.6933 19.9847 45.7984 17.1133 45.0179 14.9705ZM34.8935 30.7288C33.4321 29.7159 32.0508 28.7577 31.1485 27.0366C28.6592 22.2724 27.156 19.3967 23.2147 19.3967C19.2734 19.3967 17.7664 22.2724 15.2716 27.0366C14.3674 28.7599 12.9833 29.7191 11.5173 30.7364C9.83637 31.9017 8.09966 33.1056 7.34991 35.4748C7.05844 36.3289 6.91161 37.2395 6.91736 38.1574C6.91736 42.0149 9.52195 45.1535 12.7219 45.1535C14.373 45.1535 16.1302 44.4935 17.9897 43.795C19.7776 43.1233 21.6259 42.4291 23.224 42.4291C24.8221 42.4291 26.6658 43.1233 28.4471 43.795C30.3029 44.4893 32.0517 45.1492 33.7075 45.1492C36.9028 45.1492 39.5027 42.0106 39.5027 38.1531C39.5053 37.2345 39.3554 36.3239 39.0609 35.4705C38.3111 33.0991 36.5735 31.8941 34.8935 30.7288ZM13.3544 15.625C14.4614 17.227 15.866 18.1091 17.3097 18.1091C17.5068 18.1091 17.7036 18.0922 17.8985 18.0586C20.9096 17.5479 22.7859 13.3094 22.1701 8.40146C21.9124 6.33804 21.224 4.41626 20.238 2.99129C19.1329 1.39249 17.7264 0.511546 16.2837 0.511546C16.0866 0.511553 15.8898 0.52841 15.6948 0.561978C12.6837 1.07273 10.8075 5.31116 11.4233 10.2192C11.68 12.2794 12.3684 14.199 13.3544 15.625ZM28.5318 18.0586C28.7267 18.0922 28.9235 18.1091 29.1206 18.1091C30.5652 18.1091 31.9689 17.227 33.0759 15.625C34.061 14.199 34.7456 12.2794 35.0061 10.217C35.6219 5.31116 33.7456 1.07273 30.7345 0.559831C30.5396 0.526264 30.3428 0.509407 30.1457 0.509399C28.7029 0.511545 27.2965 1.39249 26.1914 2.99129C25.2053 4.41626 24.517 6.33804 24.2602 8.4036C23.6444 13.3095 25.5207 17.5479 28.5318 18.0586ZM9.78148 28.4959L9.79451 28.4905C10.9043 27.9766 11.7628 26.9572 12.2772 25.5419C13.0568 23.3958 12.947 20.5255 11.9842 17.8537C10.6512 14.1561 8.03826 11.6709 5.48297 11.6709C4.94185 11.67 4.40541 11.7865 3.90161 12.0143L3.88859 12.0197C2.78163 12.5294 1.92305 13.553 1.40864 14.9683C0.62912 17.1144 0.738885 19.9847 1.70166 22.6565C3.03465 26.3541 5.64762 28.8393 8.20291 28.8393C8.74309 28.8398 9.27856 28.7233 9.78148 28.4959Z" fill="#F0F0F5"/>
</svg>
</Button>
<Typography style={{position:'fixed',bottom:"15vh",right:"3vw",color:"green",zIndex:"2"}} variant="h5">Quick RFQ</Typography>
<Modal open={open} onClose={handleClose}>
  <div className="modal-container">
  {/* <IconButton className="CloseButton"
          style={{ position: "absolute", top: "1vh", right: "13vw",backgroundColor:"red"}}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton> */}
        <div class="text-center">
  <Typography variant="h5">Quick RFQ</Typography></div>
    <br/>
    <div class="container">
    <form onSubmit={handleSubmit}>
	<div class="row">
		<div class="col-6">        <TextField
          style={{ width: "18vw", margin: "5px" }}
          type="text"
          name="user"
          label="End user"
          variant="outlined"
          onChange={handleInput}
        />
</div>
		<div class="col-3">        <TextField
          style={{ width: "10vw", margin: "5px" }}
          type="text"
          name="qty"
          label="QTY"
          variant="outlined"
          onChange={handleInput}
        />
</div>
		<div class="col-3">        <TextField
          style={{ width: "10vw", margin: "5px" }}
          type="text"
          name="time"
          label="Lead Time"
          variant="outlined"
          onChange={handleInput}
        />
</div>
	</div>
  <br/>
	<div class="row">
  <div class="col">        <TextField
          style={{ width: "18vw", margin: "5px" }}
          type="date"
          name="rdate"
          label="Response By Date"
          variant="outlined"
          onChange={handleInput}
          InputLabelProps={{
            shrink: true
          }}  
        /></div>
		<div class="col">        
    <TextField
          style={{ width: "18vw", margin: "5px" }}
          type="text"
          name="details"
          label="Additional Details"
          variant="outlined"
          onChange={handleInput}
        /></div>
	</div>
  <br/>
	<div class="row">
		<div class="col">    <TextField
          label="Description"
          multiline
          name="descp"
          rows={8}
          variant="outlined"
          onChange={handleInput}
          style={{ width: "18vw", margin: "5px" }}
        />
</div>
		<div class="col"><TextField
          label="Address"
          multiline
          name="address"
          rows={8}
          variant="outlined"
          onChange={handleInput}
          style={{ width: "18vw", margin: "5px" }}
        /></div>
	</div>
  <br/>
	<div class="row">
		<div class="col"><TextField
          style={{ width: "18vw", margin: "5px" }}
          type="text"
          name="phone"
          label="Phone Number"
          variant="outlined"
          onChange={handleInput}
        /></div>
      		<div class="col"><TextField
          style={{ width: "18vw", margin: "5px" }}
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleInput}
        /></div>
	</div>
  <br/>
  <div class="row">
  <div class="col-2"> <Button variant='outlined' onClick={handleClose}style={{left:"-5vw",background:"white",color:"green"}}>Close</Button></div>
		<div class="col-2">    <Button type="submit" style={{left:"-3vw"}}>Submit</Button>   </div>
	</div>

  </form></div>
  </div>
  
</Modal>

  </div>
  );
};

export default ROQModel;
