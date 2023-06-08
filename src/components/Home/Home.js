import React from 'react'
import './home.css'
import SearchBar from './SearchBar'
import Animal from './Animal'
import MetaData from '../MetaData'
import About from "./About.js";
import ContactUs from "./ContactUs.js";
import { Link } from 'react-router-dom'
import {MdKeyboardDoubleArrowRight} from 'react-icons/md'
import TreatmentTile from './TreatmentTile'
import EssentialTile from './EssentialTile'
import MedicalCareTile from './MedicalCareTile'
import Impact from './Impact'
const Home = () => {
  return (
    <section id="home">
      <MetaData title="VetMedMan Home Page" />
{/* 
      <div className="p-5 text-center bg-image rounded-3" style={{
  height: '400px'
}}>
<div className="mask" >
     <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-black">
        <h1 className="mb-3" style={{ fontFamily: 'Kalam', fontSize: '54px', lineHeight: '92px'}}>THE BEST TO PLACE BUY SUPPLYS FOR YOUR PETS</h1>
        <h4 className="mb-3" style={{ fontFamily: 'Inter', fontWeight:'normal', fontSize: '20px', lineHeight: '120px'}}>ALL IN ONE PLACE</h4>
        <Link to='/products'>
                <button className='home-btn' type="button">EXPLORE <MdKeyboardDoubleArrowRight /></button>
      </Link>      
    </div>
    </div>
  </div>
</div> */}
      <div className='home'>
        <SearchBar />
        <div className='hero-image'>
        <div className='hero-content'>
            <div className='hero-content-inner'>
                <h1>The best place to buy supplies for your pets</h1>
                <Link to='/products'>
                <button className='home-btn' type="button">Our Products <MdKeyboardDoubleArrowRight /></button>
                </Link>
            </div>
        </div>
    </div>
      </div>
            <About />
      <Animal />
      <TreatmentTile />
      <EssentialTile />
      <MedicalCareTile />
      <Impact />
      <ContactUs />
    </section>
  )
}

export default Home