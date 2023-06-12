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

/**
 * Home component represents the home page of the application.
 *
 * @component
 * @returns {JSX.Element} - The Home component.
 */

const Home = () => {
  return (
    <section id="home">
      <MetaData title="VetMedMan Home Page" />
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
      <br/>
      <ContactUs />
    </section>
  )
}

export default Home