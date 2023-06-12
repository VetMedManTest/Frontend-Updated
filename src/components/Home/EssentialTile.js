import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getProduct } from '../../actions/productAction'
import { Link, useParams } from 'react-router-dom'
import './treatmentTile.css'
import { dailyEssentialsTypeLoadAction } from '../../actions/categories/dailyEssentialTypeAction'
import Loader from '../layout/Loader/Loader'


/**
 * EssentialTile component displays daily essential items.
 *
 * @component
 * @returns {JSX.Element} - The EssentialTile component.
 */


const EssentialTile = () => {

    const { dailyEssentialType, loading } = useSelector(state => state.dailyEssentialTypeAll)
    const dispatch = useDispatch();
  const { essential} = useParams()
  const {error} = useSelector(state=>state.products)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const alert = useAlert();
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors())

    }

   dispatch(getProduct(essential))
  },[dispatch,essential,error,alert])

  useEffect(()=>{
    dispatch(dailyEssentialsTypeLoadAction())

   // to set the tiltes according to the window size
   const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
  },[dispatch])

  return (
    <section id="essential" className="py-5">
    {
      loading ? <Loader />: 
      <div className="container">
      <h1 className="text-center mb-5" style={{fontFamily:'Inter'}}>Daily Essentials</h1>
      <div className={`row ${window.innerWidth <= 800 ? 'row-cols-3' : 'row-cols-md-6'} g-3`} >
      {console.log(windowWidth)}
      {/* <div className="row row-cols-1 row-cols-md-6 g-3"> */}
        {dailyEssentialType &&
          dailyEssentialType.map((essential) => (
            <Link key={essential._id} className='link' to={`search/essential/${essential._id.toString()}`}>
                <div className="col ">
              <div className="Treatmentcard h-100 m-2">
                <img
                  style={{width:"100%", height:150, padding:20, objectFit:'contain'}}
                  src={essential.imageUrl}
                  className="card-img-top"
                  alt={essential.essentialName}
                />
              </div>
              <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{fontFamily:'Kalam', textAlign: 'center'}}>{essential.essentialName}</h5>
                </div>
            </div>
        </Link>
          
          ))}
      </div>
    </div>
    }
  </section>
  )
}

export default EssentialTile