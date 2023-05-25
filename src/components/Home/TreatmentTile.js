import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getProduct } from '../../actions/productAction'
import { treatmentTypeLoadAction } from '../../actions/categories/treatmentTypeAction'
import { Link, useParams } from 'react-router-dom'
import './treatmentTile.css'
import Loader from '../layout/Loader/Loader'

const TreatmentTile = () => {

  const { treatmentType,loading } = useSelector(state => state.treatmentTypeAll)
  const dispatch = useDispatch();
  const { treatment} = useParams()
  const {error} = useSelector(state=>state.products)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const alert = useAlert();
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors())
    }

   dispatch(getProduct(treatment))
  },[dispatch,treatment,error,alert])

  useEffect(()=>{
    dispatch(treatmentTypeLoadAction())
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[dispatch])

  return (
    <section id="treatment" className="py-5">
   {
    loading ? <Loader /> :
    <div className="container">
    <h1 className="text-center mb-5" style={{fontFamily:'Inter'}}>Treatment Wise</h1>
    <div className={`row ${window.innerWidth <= 800 ? 'row-cols-3' : 'row-cols-md-6'} g-3`} >
    {/* <div className="row row-cols-1 row-cols-md-6 g-3"> */}
      {treatmentType &&
        treatmentType.map((treatment) => (
          <Link key={treatment._id} className='link' to={`search/treatment/${treatment._id.toString()}`}>
              <div className="col ">
            <div className="Treatmentcard h-100 m-2">
              <img
                style={{width:"100%", height:150, padding:20, objectFit:'contain'}}
                src={treatment.imageUrl}
                className="card-img-top"
                alt={treatment.TreatmentTypeName}
              />
             
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{fontFamily:'Kalam', textAlign: 'center'}}>{treatment.TreatmentTypeName}</h5>
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

export default TreatmentTile