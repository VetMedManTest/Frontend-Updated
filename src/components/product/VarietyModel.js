import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVarietyDetails } from '../../actions/varietiesAction';
import Loader from '../layout/Loader/Loader';
import { Checkbox, FormControlLabel, Button, Modal, FormControl } from '@mui/material';
import { addItemsToCart } from '../../actions/cartAction';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import './varietyModel.css'

const VarietyModel = ({ varietyId }) => {
  const dispatch = useDispatch();
  const { loading, variety, error } = useSelector((state) => state.varietyDetails);

  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [quantity] = useState(1);

  const { id } = useParams();
  const { product } = useSelector(
    (state) => state.productDetails
  );
const alert = useAlert();
  useEffect(() => {
    dispatch(getVarietyDetails(varietyId));

    const storedValues = localStorage.getItem("VetselectedValues");
    if (storedValues) {
      setSelectedValues(JSON.parse(storedValues));
    }
  }, [dispatch, varietyId]);

  if (loading) {
    return <p>
      <Loader />
    </p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((v) => v !== value);
      } else {
        return [...prevSelectedValues, value];
      }
    });
  };

  const handleFormSubmit = () => {
    console.log(selectedValues);
    localStorage.setItem("VetselectedValues", JSON.stringify(selectedValues));
    setShowAddToCart(true);
    handleClose();
    
  };

  const addToCartHandler = () => {
    
    dispatch(addItemsToCart(id,quantity));
    alert.success("Item Added to cart");
  };
  return (
    <div>
 {showAddToCart ? (
        <Button variant="outlined" style={{textTransform: 'none',marginLeft:"20px",marginTop:"20px"}} onClick={addToCartHandler} disabled={product.Stock < 1 ? true : false}>
          Add to Cart
        </Button>
      ) : (
        <Button variant="outlined" style={{textTransform: 'none',marginLeft:"20px",marginTop:"20px"}} onClick={handleOpen}>Open Variety Selection</Button>
      )}
<Modal open={open} onClose={handleClose}>
  <div className="modal-container">
  {/* <IconButton className="CloseButton"
          style={{ position: "absolute", top: "1vh", right: "13vw",backgroundColor:"red"}}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton> */}
    <h2>Variety Details</h2>
    <FormControl>
    {Object.entries(variety).map(([key, values]) => {
      if (Array.isArray(values)&& values.length > 0) {
        return (
          <div className="section" key={key}>
            <h6>{key}</h6>
            <div  className="checkbox-container">
              {values.map((value) => (
                <div className="checkbox-item" key={value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={value}
                        checked={selectedValues.includes(value)}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={value}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return null;
      }
    })}
    </FormControl>
    <br/>
    <Button onClick={handleFormSubmit}>Submit</Button>
  </div>
</Modal>

  </div>
  );
};

export default VarietyModel;
