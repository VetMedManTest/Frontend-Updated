import React from 'react';
import { IconButton } from '@material-ui/core';
import { AiOutlineHeart } from 'react-icons/ai';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const options={
        readOnly: true,
        precision: 0.5,
        value:product.ratings,
       
    }
  return (
   <Link className='link' to={`/product/${product._id}`} target='_blank'>
    <div className="product-card">
      <div className="product-image">
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <div className="product-info">
        {/* <div className="product-price">Price: ₹{product.price}</div> */}
        <div className="product-size">Size: {product.size_of_instrument.join(', ')}</div>
        <div className="product-stage">Stage: {product.stage}</div>
    </div>
        <Rating className='product-rating ' {...options} /><span className='noOfReviews'>({product.numOfReviews} Reviews)</span>
        <IconButton aria-label="add to favorites">
          <AiOutlineHeart />
        </IconButton>
      </div>
    </div>
   </Link>
  );
};

export default ProductCard;
