import React, { useEffect } from 'react';
import './navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserOptions from './UserOptions';
import Logo from "../../assets/images/Logo.png";
import { animalTypeLoadAction } from '../../actions/categories/animalTypeAction';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { treatmentTypeLoadAction } from '../../actions/categories/treatmentTypeAction';
import { dailyEssentialsTypeLoadAction } from '../../actions/categories/dailyEssentialTypeAction';
import { medicalCareTypeLoadAction } from '../../actions/categories/medicalCareTypeAction';
import { FaAngleDown } from 'react-icons/fa';

const Navbar = () => {

  const { isAuthenticated,user } = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const alert = useAlert();

  const {animalType} = useSelector(state=>state.animalTypeAll)
  const { animal,treatment,essential,medical} = useParams()
  const {error} = useSelector(state=>state.products)
  const {cartItems } =  useSelector((state)=> state.cart);
  const { treatmentType } = useSelector(state => state.treatmentTypeAll)
  const { dailyEssentialType } = useSelector(state => state.dailyEssentialTypeAll)
  const { MedicalCareType } = useSelector(state => state.medicalCareTypeAll)

  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors())
    }

   dispatch(getProduct(animal,treatment,essential,medical))
  },[dispatch,animal,treatment,essential,medical,error,alert])

  useEffect(()=>{
    dispatch(animalTypeLoadAction())
    dispatch(treatmentTypeLoadAction())
    dispatch(dailyEssentialsTypeLoadAction())
    dispatch(medicalCareTypeLoadAction())
  
  },[dispatch])

  return (
    <>
  <div className='navbar' >
  <nav>
    <div className="wrapper">
      <div className="logo">
        <a href="/">
        <img src={Logo} alt="logo"/>
      </a></div>
      <input type="radio" name="slider" id="menu-btn" />
      <input type="radio" name="slider" id="close-btn" />
      <ul className="nav-links">
        <label htmlFor="close-btn" className="btn close-btn"><RxCross1 /></label>
        <Link to='/' className='link'>
        <li><a href="/#home">Home</a></li>
        </Link>
        <li><a href="/#about">About Us</a></li>
        <li><a href="/#impact">Impact</a></li>
        <li>
          <a href="/#animals" className="desktop-item">Pet<FaAngleDown  /> </a>
          <input type="checkbox" id="showDrop" />
          <label htmlFor="showDrop" className="mobile-item">Pet<FaAngleDown style={{ color: 'rgba(0, 0, 0, 0.6)' }}/></label>
          <ul className="drop-menu">
          {animalType && animalType.map(animal => (
        <li key={animal._id}>
          <Link to={`search/animal/${animal._id.toString()}`}>
            {animal.animalName}
          </Link>
        </li>
  ))}
          </ul>
        </li>
        <li>
          <a href="/#treatment" className="desktop-item">Categories<FaAngleDown /></a>
          <input type="checkbox" id="showMega" />
          <label htmlFor="showMega" className="mobile-item">Categories<FaAngleDown /></label>
          <div className="mega-box">
            <div className="content">
              <div className="row">
                <header>TREATMENT</header>
                <ul className="mega-links">
                {treatmentType && treatmentType.map(treatment => (
            <li key={treatment._id}>
          <Link to={`search/treatment/${treatment._id.toString()}`}>
            {treatment.TreatmentTypeName}
          </Link>
            </li>
            ))}
                </ul>
              </div>
              <div className="row">
                <header>MEDICAL CARE</header>
                <ul className="mega-links">
                {MedicalCareType && MedicalCareType.map(medical => (
            <li key={medical._id}>
          <Link to={`search/medical/${medical._id.toString()}`}>
            {medical.medicalCareName}
          </Link>
        </li>
          ))}
                </ul>
              </div>
              <div className="row">
                <header>DAILY ESSENTIALS</header>
                <ul className="mega-links">
                {dailyEssentialType && dailyEssentialType.map(essential => (
            <li key={essential._id}>
          <Link to={`search/essential/${essential._id.toString()}`}>
            {essential.essentialName}
          </Link>
        </li>
  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
        <Link to='/products' className='link'>
        <li><a href="/#">Products</a></li>
        </Link>
        <li><a href="/#contact">Contact Us</a></li>

       {
        isAuthenticated ? <UserOptions user={user}/>: 
        <>
      <Link to='/login' className='link'>
      <button style={{width:"8vw"}}className='signin'>Signin</button> 
      </Link> 
      </> 
       }
      <span className='navbar-cart'>
      <Link to='/cart' className='link'>
      <BsFillCartPlusFill className='cart-icon'/>
      <div className="cart-length">{cartItems.length}</div>
      </Link>
      </span>
      </ul>
      <label htmlFor="menu-btn" className="btn menu-btn"><GiHamburgerMenu /></label>
    </div>
  </nav>
  </div>
    </>
  );
};

export default Navbar;
