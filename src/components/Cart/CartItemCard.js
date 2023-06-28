import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'

/**
 * CartItemCard component displays a single item in the cart.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item object to display.
 * @param {Function} props.deleteCartItems - The function to delete the item from the cart.
 * @returns {JSX.Element} - The CartItemCard component.
 */

const CartItemCard = ({item,deleteCartItems}) => {
  return <>
 <div className="CartItemCard">
    <img src={item.image} alt="cartItem" />
    <div>
        <Link to ={`/product/${item.product}`}>{item.name}</Link>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
    </div>
 </div>
  </>
}

export default CartItemCard