import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getProduct } from '../../actions/productAction'
import { Link, useParams } from 'react-router-dom'
import './treatmentTile.css'
import { medicalCareTypeLoadAction } from '../../actions/categories/medicalCareTypeAction'
import Loader from '../layout/Loader/Loader'

const MedicalCareTile = () => {

    const { MedicalCareType, loading } = useSelector(state => state.medicalCareTypeAll)
    const dispatch = useDispatch();
  const { medical} = useParams()
  const {error} = useSelector(state=>state.products)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const alert = useAlert();
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors())
    }

   dispatch(getProduct(medical))
  },[dispatch,medical,error,alert])

  useEffect(()=>{
    dispatch(medicalCareTypeLoadAction())
  
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
    loading ? <Loader /> :
    <div className="container">
    <h1 className="text-center mb-5"  style={{fontFamily:'Inter'}}>Medical Care</h1>
    <div className={`row ${window.innerWidth <= 800 ? 'row-cols-3' : 'row-cols-md-6'} g-3`} >
    {console.log(windowWidth)}
    {/* <div className="row row-cols-1 row-cols-md-6 g-3"> */}
      {MedicalCareType &&
        MedicalCareType.map((medical) => (
          <Link key={medical._id} className='link' to={`search/medical/${medical._id.toString()}`}>
              <div className="col ">
            <div className="Treatmentcard h-100 m-2">
              <img
                src={medical.imageUrl}
                className="card-img-top"
                alt={medical.medicalCareName}
              />
            </div>
            <div style={{fontFamily:'Kalam', textAlign: 'center'}} className="card-body d-flex flex-column">
                <h5 className="card-title" >{medical.medicalCareName}</h5>
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

export default MedicalCareTile