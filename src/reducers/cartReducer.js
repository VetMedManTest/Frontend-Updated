import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    RESET_CART,
    SAVE_SHIPPING_INFO,
    SAVE_BILLING_INFO
  } from "../constants/cartConstant"

  export const cartReducer = (state = {cartItems: [], shippingInfo:{}},action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

         const isItemExist = state.cartItems.find(
            (i)=>i.product === item.product
         )   

         if(isItemExist){
            return {
                ...state,
                cartItems: state.cartItems.map((i) =>
                  i.product === isItemExist.product ? item : i
                ),
              };
         }
         else{
            return {
                ...state,
                cartItems: [...state.cartItems,item],
            }
           
         }
         case REMOVE_CART_ITEM:
            return {
              ...state,
              cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };
         case SAVE_SHIPPING_INFO:
               return {
                  ...state,
                  shippingInfo: action.payload,
               };
         case SAVE_BILLING_INFO:
               return {
                  ...state,
                  billingInfo: action.payload,
               };
         case RESET_CART:
               return {
                  cartItems: [],
               };
    default:
       return state;
    }
  }
  
