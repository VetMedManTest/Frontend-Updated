import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getProduct } from '../../actions/productAction'
import { Link, useParams } from 'react-router-dom'
import { animalTypeLoadAction } from '../../actions/categories/animalTypeAction'
import Loader from '../layout/Loader/Loader'

const Animal = () => {

  const {animalType ,loading} = useSelector(state=>state.animalTypeAll)

  const dispatch = useDispatch();
  const { animal} = useParams()
  const {error} = useSelector(state=>state.products)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const alert = useAlert();
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors())
    }

   dispatch(getProduct(animal))
  },[dispatch,animal,error,alert])

  useEffect(()=>{
    dispatch(animalTypeLoadAction())

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
    <section id="animals" className="py-5">
   {
    loading ? <Loader />:
    <div className="container">
    <h1 className="text-center mb-5"  style={{fontFamily:'Inter'}}>Species Wise</h1>
    <div className={`row ${window.innerWidth <= 800 ? 'row-cols-3' : 'row-cols-md-6'} g-3`} >

    {/* <div className="row row-cols-1 row-cols-md-6 g-3"> */}
      {animalType &&
        animalType.map((animal) => (
          <Link className='link' key={animal._id} to={`search/animal/${animal._id.toString()}`}>
              <div className="col">
            <div className="Treatmentcard h-100 m-2">
              <img
                src={animal.imageUrl}
                className="card-img-top"
                alt={animal.animalName}
              />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title"  style={{fontFamily:'Kalam', textAlign: 'center'}}>{animal.animalName}</h5>
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

export default Animal