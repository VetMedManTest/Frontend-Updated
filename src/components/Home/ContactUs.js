import React from "react";
import Logo from "../../assets/images/Logo.png";

/**
 * ContactUs component displays contact information and details.
 *
 * @component
 * @returns {JSX.Element} - The ContactUs component.
 */


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
                      src={'https://res.cloudinary.com/djj6woj8s/image/upload/v1686209248/Contact_Us_cmvf44.svg'}
                      alt="contactUs"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="col-md-6 mb-4 mr-4">
                    <div>
                      <img src={Logo} alt="logo" style={{ width: "185px" }} />
                      <h1 className="mt-3 mb-5 pb-1">Contact Us</h1>
                      <p><i class="bi bi-whatsapp" style={{paddingRight:"5px", color:"green"}}></i>Mobile Number:<a href="https://wa.me/919773727759"> +91 97737 27759</a></p>
                      <p><i class="bi bi-envelope-at" style={{paddingRight:"5px", color:"red"}}></i>Email : <a href="mailto:vetmedmanhq@gmail.com">vetmedmanhq@gmail.com</a></p>
                      <p>
                        Our customer service team is available every day from 9
                        am to 6 pm to answer any queries. We value your feedback
                        and are committed to providing the best customer
                        service. Any queries will be answered within 24-48 hours
                        on working business days.
                      </p>
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
