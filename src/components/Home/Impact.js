import React from 'react';
import './impact.css'

const Impact = () => {
  return (
    <section
      id="impact"
      className="desktop-view"
    >
        <h1 className="text-center mb-5" style={{fontFamily:'Inter'}}>OUR IMPACT </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center"> {/* Updated class: justify-content-center */}
        <div className="col">
          <div className="card card-sm" style={{ height: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' , fontFamily:'Inter'}}>
            <img
              src="https://res.cloudinary.com/djj6woj8s/image/upload/v1686155812/1_ewhrxw.png"
              className="card-img-top"
              alt="Product Quality"
            />
            <div className="card-body">
              <h5 style={{fontFamily:"kalam",fontSize:"20px"}} className="card-title">Uncompromising Product Quality</h5>
              <p className="card-text">
              Vetmedman prioritizes quality and tests products to ensure safety and effectiveness.</p>            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-sm" style={{ height: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' ,fontFamily:'Inter'}}>
            <img
              src="https://res.cloudinary.com/djj6woj8s/image/upload/v1686156038/Untitled_design_lae1bo.png"
              className="card-img-top"
              alt="Customer Service"
            />
            <div className="card-body">
              <h5 style={{fontFamily:"kalam",fontSize:"20px"}} className="card-title">Personalized Customer Service</h5>
              <p className="card-text">
              Vetmedman strives to build lasting partnerships with clients by providing tailored recommendations and exceptional services.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-sm" style={{ height: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',fontFamily:'Inter' }}>
            <img
              src="https://res.cloudinary.com/djj6woj8s/image/upload/v1686156596/Untitled_design_1_xbthw8.png"
              className="card-img-top"
              alt="Affordable Excellence in Product Pricing"
            />
            <div className="card-body">
              <h5 style={{fontFamily:"kalam",fontSize:"20px"}} className="card-title">Affordable Pricing</h5>
              <p className="card-text">
              Vetmedman is committed to providing superior veterinary products at an affordable price, while maintaining the highest standards of service quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
