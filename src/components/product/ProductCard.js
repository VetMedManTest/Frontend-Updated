import React from 'react';
import { IconButton } from '@material-ui/core';
import { AiOutlineHeart } from 'react-icons/ai';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * ProductCard component displays the details of a product in a card format.
 *
 * @param {Object} product - The product object containing the details of the product.
 * @param {string} product._id - The ID of the product.
 * @param {string} product.name - The name of the product.
 * @param {string} product.images[0].url - The URL of the first product image.
 * @param {number} product.ratings - The rating of the product.
 * @param {number} product.numOfReviews - The number of reviews for the product.
 * @param {string[]} product.size_of_instrument - The array of sizes of the instrument.
 * @param {string} product.stage - The stage of the product.
 * @returns {JSX.Element} The rendered ProductCard component.
 */

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
