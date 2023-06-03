import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import {  useParams } from 'react-router-dom';
import './productdetail.css'
import MetaData from '../MetaData';
import Carousel from 'react-material-ui-carousel'
import { Card, Rating } from '@mui/material';
import ReviewCard from './ReviewCard';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../../actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  colors,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import VarietyModel from './VarietyModel'


const ProductDetails = () => {
   

    const { id } = useParams();
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    const alert = useAlert();
    //const { isAuthenticated} = useSelector((state)=>state.user);
    //const navigate = useNavigate()

 
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
      
      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");
      

      const increaseQuantity = () =>{
        if(product.Stock <= quantity) return
    
        const qty = quantity + 1;
        setQuantity(qty);
      }
      const decreaseQuantity = () =>{
        if(1 >= quantity) return
    
        const qty = quantity - 1;
        setQuantity(qty);
      }

      const addToCartHandler = () =>{

          dispatch(addItemsToCart(id,quantity));
        alert.success("Item Added to cart");
      
      }

      const submitReviewToggle = () =>{
        open ? setOpen(false) : setOpen(true);
      }
      const reviewSubmitHandler = () =>{
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment",comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
        setOpen(false)
    
      }

      useEffect(()=>{
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        if(reviewError){
          alert.error(reviewError)
          dispatch(clearErrors())
         }
         if(success){
          alert.success("Review Submitted Successfully");
          dispatch({type: NEW_REVIEW_RESET})
         }
  
          dispatch(getProductDetails(id))
      },[dispatch,id,error,alert,success,reviewError])
  
  return (
  <>
  {
    loading ? <Loader />:
    <>


    <MetaData title={product.name} />
    <div className="ProductDetails">
    <div className='Container'>
                  <Carousel  className='carousel'>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
                <div className='MainDetailContainer'>
            <div className="detailsBlock-1">
                <h2>{product.name}</h2>
            </div>
            <div className='detailsBlock-2'>
                <Rating {...options} />
                <span className='detailssBlock-2'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
            {/* <h1>{`₹${product.price}`}</h1> */}
            <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
            <Button variant="contained" style={{borderRadius:"50%",backgroundColor:"red"}} onClick={decreaseQuantity}>-</Button>
            <input type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value) } />
            <Button variant="contained" style={{borderRadius:"100%",backgroundColor:"green"}} onClick={increaseQuantity}>+</Button>
            </div>
            {product.varieties ? <VarietyModel varietyId={product.varieties}/> :<>
            <Button variant="outlined" style={{textTransform: 'none',marginLeft:"20px",marginTop:"20px"}} onClick={addToCartHandler} disabled={product.Stock < 1 ? true: false}>Add to Cart</Button>
            </>}
            </div>
    
            <p>
            Availability:{" "}
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
               {product.Stock} Products {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
            </b>
            </p>
        </div>
        <div className="detailsBlock-4">
            Description : <p style={{marginRight:"15vw"}}>{product.description}</p>
        </div>
        <div className='detailsBlock-6'>
        <p className="no-margin">Shelf Life - {product.shelflife}</p>
        <p className="no-margin">Guarantee - {product.guarantee} years</p>
      </div>
        <Card className="card-detailsBlock-5">
        <b>Key Features</b>
        <ul>
        {product.brand && product.brand.trim() !== '' && (
        <li>
          <p>Brand - {product.brand}</p>
        </li>
          )}
        {product.material_used && product.material_used.trim() !== '' && (
        <li>
          <p>Material Used - {product.material_used}</p>
        </li>
          )}
  {product.color && !(product.color.includes("")) && (
  <li>
    <p>Color - {product.color.toString()}</p>
  </li>
  )}
  {product.size_of_instrument && !(product.size_of_instrument.includes("")) && (
  <li>
    <p>Size of instrument - {product.size_of_instrument.toString()}</p>
  </li>
  )}
      {product.model_number &&  product.model_number.trim() !== '' &&(
      <li>
        <p>Model Number - {product.model_number}</p>
      </li>
    )}
    {product.stage &&  product.stage.trim() !== '' &&(
    <li>
      <p>Stage - {product.stage}</p>
    </li>
    )}
  {product.condition && product.condition.trim() !== '' && (
  <li>
    <p>Condition - {product.condition}</p>
  </li>
  )}
  {product.specific_feature && product.specific_feature.trim() !== '' && (
  <li>
    <p>Specific Feature - {product.specific_feature}</p>
  </li>
  )}
  {product.packaging_dimensions && product.packaging_dimensions.trim() !== '' && (
  <li>
    <p>Packaging Dimension - {product.packaging_dimensions}</p>
  </li>
  )}
  {product.mode_of_administration && product.mode_of_administration.trim() !== '' && (
  <li>
    <p>Mode of Administration - {product.mode_of_administration}</p>
  </li>
  )}
  {product.caution && product.caution.trim() !== '' && (
  <li>
    <p>Caution - {product.caution}</p>
  </li>
  )}
  {product.weight_of_the_commodity && product.weight_of_the_commodity.trim() !== '' && (
  <li>
    <p>Weight of Commodity - {product.weight_of_the_commodity}</p>
  </li>
  )}
    {product.dimension_of_the_product && product.dimension_of_the_product.trim() !== '' && (
  <li>
    <p>Product Dimensions - {product.dimension_of_the_product}</p>
  </li>
  )}

    {product.MOQ && product.MOQ.trim() !== '' && (
  <li>
    <p>Minimum Order Quantity - {product.MOQ}</p>
  </li>
  )}
  {product.dosage_recommended && product.dosage_recommended.trim() !== '' && (
  <li>
    <p>Recommended Dosage - {product.dosage_recommended}</p>
  </li>
  )}
    {product.active_ingredients && product.active_ingredients.trim() !== '' && (
  <li>
    <p>Active Ingredients - {product.active_ingredients}</p>
  </li>
  )}
      {product.fast_moving_spare_parts && product.fast_moving_spare_parts.trim() !== '' && (
  <li>
    <p>Fast Moving Spare parts - {product.fast_moving_spare_parts}</p>
  </li>
  )}
    {product.country_of_manufacture && product.country_of_manufacture.trim() !== '' && (
  <li>
    <p>Country of Manufacture - {product.country_of_manufacture}</p>
  </li>
  )}
     {product.lead_time_to_deliver && product.lead_time_to_deliver.trim() !== '' && (
  <li>
    <p>Lead Time to Deliver - {product.lead_time_to_deliver}</p>
  </li>
  )}
    {product.fda_or_certified && product.fda_or_certified.trim() !== '' && (
  <li>
    <p>FDA or Certified - {product.fda_or_certified}</p>
  </li>
  )}
    {product.total_primary_packet && product.total_primary_packet.trim() !== '' && (
  <li>
    <p>Total Primary Packet - {product.total_primary_packet}</p>
  </li>
  )}
    {product.primary_packing_Single_hand && product.primary_packing_Single_hand.trim() !== '' && (
  <li>
    <p>Single hand Primary packing - {product.primary_packing_Single_hand}</p>
  </li>
  )}
    {product.prior_prophylactic_preparation && product.prior_prophylactic_preparation.trim() !== '' && (
  <li>
    <p>Prior Prophylactic Preparation - {product.prior_prophylactic_preparation}</p>
  </li>
  )}
  {product.shelflife && product.shelflife.trim() !== '' && (
  <li>
    <p>Shelf Life - {product.shelflife}</p>
  </li>
  )}
  {product.lab_instruments && product.lab_instruments.trim() !== '' && (
  <li>
    <p>Lab Instruments - {product.lab_instruments}</p>
  </li>
  )}
        </ul>      
        </Card>
  
        <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
        </button>
        </div>
    </div>
    <Dialog
        aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
         <DialogContent className='submitDialog'>
         <Rating
          onChange={(e)=> setRating(e.target.value)}
          value={Number(rating)}
          size="large"
            />

            <textarea
            className='submitDialogTextArea'
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
              ></textarea>
         
         </DialogContent>
        <DialogActions>
        <Button onClick={submitReviewToggle} color='secondary'>Cancle</Button>
         <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
        </DialogActions>
      </Dialog>


{/* accordian */}
    <div className='all-accordian'>
      <Accordion className='review-accodian'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className='reviewsHeading'>REVIEWS</Typography>

        </AccordionSummary>
        <AccordionDetails className='review-accordion-details'>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review, i) => (
                <ReviewCard review={review} key={i} />
              ))}
            </div>
          ) : (
            <Typography className="noReviews">
              No reviews Yet
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>


{/* all-faqs-accordian */}
  <div className='faqs-box'>
  {product.faqs && product.faqs[0] ? (
    <div className="faq">
      {product.faqs.map((faq, i) => (
        <Accordion key={i} className='faq-accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}-content`}
            id={`panel${i}-header`}
          >
            <Typography className='faqs'>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='faq-answer'>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  ) : (
    <Typography className="noReviews">
      No FAQs Yet
    </Typography>
  )}
</div>

  </div>
    </>
  }
  </>
    
  )

}

export default ProductDetails


