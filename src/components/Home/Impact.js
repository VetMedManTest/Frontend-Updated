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
              src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
              className="card-img-top"
              alt="Product Quality"
            />
            <div className="card-body">
              <h5 className="card-title">Uncompromising Product Quality at Vetmedman</h5>
              <p className="card-text">
              At Vetmedman, we prioritize the quality of our products above all else. We follow the strictest standards to ensure that every product in our catalog meets regulatory requirements. Through comprehensive testing, we guarantee the safety and effectiveness of our offerings.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-sm" style={{ height: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' ,fontFamily:'Inter'}}>
            <img
              src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
              className="card-img-top"
              alt="Customer Service"
            />
            <div className="card-body">
              <h5 className="card-title">Personalized and Unmatched Customer Service</h5>
              <p className="card-text">
              We understand the importance of building lasting partnerships with our clients at Vetmedman. Our team takes the time to get to know your practice, enabling us to provide tailored recommendations that meet your unique needs. Our staff is always available to assist you with any challenges you may encounter, demonstrating our unwavering commitment to exceptional service.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card-sm" style={{ height: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',fontFamily:'Inter' }}>
            <img
              src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
              className="card-img-top"
              alt="Affordable Excellence in Product Pricing"
            />
            <div className="card-body">
              <h5 className="card-title">Affordable Excellence in Product Pricing</h5>
              <p className="card-text">
              We are committed to making superior veterinary products accessible to all. We offer a range of competitively priced products without compromising on quality. Our dedication to affordability is matched by our commitment to maintaining the highest standards of service quality. When you choose Vetmedman, you can expect to receive the finest products at an exceptional value.              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
