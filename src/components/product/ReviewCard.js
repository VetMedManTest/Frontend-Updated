import React from 'react'
import profilePng from '../../assets/images/Profile.png'
import { Rating } from '@mui/material';

/**
 * ReviewCard component displays a single review.
 *
 * @param {Object} review - The review object containing review details.
 * @param {string} review.name - The name of the reviewer.
 * @param {number} review.rating - The rating given by the reviewer.
 * @param {string} review.comment - The comment provided by the reviewer.
 * @returns {JSX.Element} The rendered ReviewCard component.
 */
const ReviewCard = ({review}) => {

  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className='reviewCard'>
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard