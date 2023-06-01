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
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
            <button onClick={decreaseQuantity}>-</button>
            <input type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value) } />
            <button onClick={increaseQuantity}>+</button>
            </div>
            {product.varieties ? <VarietyModel varietyId={product.varieties}/> :<>
            <button onClick={addToCartHandler} disabled={product.Stock < 1 ? true: false}>Add to Cart</button>
            </>}
            </div>
    
            <p>
            Availability:
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
               {product.Stock} Products {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
            </p>
        </div>
        <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
        </div>
        <div className='detailsBlock-6'>
        <p className="no-margin">Shelf Life - {product.shelflife}</p>
        <p className="no-margin">Guarantee - {product.guarantee} years</p>
      </div>
        <Card className="card-detailsBlock-5">
        <b>Key Features</b>
        <ul>
            <li> <p>Brand - {product.brand}</p></li>
            <li> <p>Model Number - {product.model_number}</p></li>
            <li> <p>Stage - {product.stage}</p></li>
            <li> <p>Condition - {product.condition}</p></li>
            <li> <p>Specific Feature - {product.specific_feature}</p></li>
            <li> <p>Packaging Dimension - {product.packaging_dimensions}</p></li>
            <li> <p>Mode of Administration - {product.mode_of_administration}</p></li>
            <li><p>caution - {product.caution}</p></li>
            <li><p>Weight of Commodity - {product.weight_of_the_commodity}</p></li>
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


