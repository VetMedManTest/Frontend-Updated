import React from "react";
import Logo from "../../assets/images/Logo.png";
const ContactUs = () => {
  return (
    <section id="contact" className="h-100 gradient-form">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xxl-12">
            <div className="card rounded-3 text-black">
              <div className="card-body p-md-5 mx-md-4">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'}
                      alt="contactUs"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="col-md-6 mb-4 mr-4">
                    <div>
                      <img src={Logo} alt="logo" style={{ width: "185px" }} />
                      <h1 className="mt-3 mb-5 pb-1">CONTACT US</h1>
                      <p>
                        Our company is dedicated to providing excellent customer
                        service and support. If you have any questions, comments
                        or concerns about our products or services, please
                        contact us using the information below.
                      </p>
                      <p>
                        Our customer service team is available every day from 9
                        am to 6 pm to answer any queries. We value your feedback
                        and are committed to providing the best customer
                        service. Any queries will be answered within 24-48 hours
                        on working business days.
                      </p>
                      <h5 className="mt-5 mb-3">Or Contact Us Directly</h5>
                      <p>Phone: 1-800-123-4567</p>
                      <p>Email: info@vetmedman.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
