import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearErrors, register } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader'
import Logo from "../../assets/images/Logo.png";

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const navigate = useNavigate();
    const location =  useLocation();

    const {loading, error,isAuthenticated} = useSelector((state)=> state.user)
  
    const dispatch = useDispatch()
    const registerSubmit =(e)=>{
        e.preventDefault();

      
        dispatch(register(name,email,password))
    }

    
    const path = location.pathname + location.search;
    const redirect = path ? path.split("=")[1] : '/account'
   

    useEffect(()=>{
        if(error){
          dispatch(clearErrors())
          alert.error(error)
        }
        if(isAuthenticated){
          navigate(redirect)
        }
      },[dispatch,error,alert,navigate,isAuthenticated,redirect])
    

  return (
  <>
  {
    loading ? <Loader />:  <section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
  
                  <div className="text-center">
                    <img src={Logo} alt='logo' 
                      style={{width: '185px'}} />
                    <h4 className="mt-1 mb-5 pb-1">THE BEST TO PLACE BUY SUPPLYS FOR YOUR PETS</h4>
                  </div>
  
                  <form onSubmit={registerSubmit} 
                  >
                    <p>Please Register to login</p>
  
                    <div className="form-outline mb-4">
                      <input type={'text'} id="name" className="form-control"
                        placeholder="your name" 
                          value={name}  
                          onChange={e => setName(e.target.value)}
                        />
                      <label className="form-label" for="form2Example11">Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type={'email'} id="email" className="form-control"
                        placeholder="Enter your Email" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)} 
                        />
                      <label className="form-label" for="form2Example11">Email</label>
                    </div>
  
                    <div className="form-outline mb-4">
                      <input type={'password'} id="password" className="form-control"
                        placeholder="Enter your Password" 
                          value={password} 
                          onChange={e => setPassword(e.target.value)} 
                        />
                      <label className="form-label" for="form2Example11">Password</label>
                    </div>
                    <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Register
                          </button>
                          <Link to="/password/forgot">Forgot password?</Link>
                      </div>
                    <div className="d-flex align-items-center justify-content-center pb-4">
                      
                      <p className="mb-0 me-2">Already have a account please login!</p>
                     
                      <Link to='/login'>
                      <button type="button" className="btn btn-outline-danger">Login</button>
                      </Link>
                    </div>
  
                  </form>
  
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">We are more than just a company</h4>
                  <p className="small mb-0">
                    At Vedmedman, our utmost aim is to advance the welfare and wellness of animals. We accomplish this by upholding uncompromising quality criteria for all our wares. Our perspective on animal welfare is driven by our acknowledgment of the exceptional connection between animals and their human counterparts, which inspires us to provide incomparable service to strengthen this extraordinary relationship.</p>
                    <br />
                    <p className="small mb-0">
                    We take pride in our commitment to supplying first-rate veterinary therapeutics and surgical medical equipment to benefit animal healthcare experts' and pet owners' cherished animal companions. Our dedication to serving the export market empowers us to attend to the unique needs of our customers.</p>
                    <br />
                    <p className="small mb-0">
                    If you are a new customer, we warmly welcome you to register with us today and encounter the pinnacle of empathetic animal care products and services we offer. Existing customers need not sign up again.</p>
                    <br />
                    <p className="small mb-0">
                    Thank you for choosing Vedmedman as your esteemed partner in providing exceptional animal care products and medicines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  }
  </>
  )
}

export default Register