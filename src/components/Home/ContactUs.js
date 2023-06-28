import React from "react";
import Logo from "../../assets/images/Logo.png";
import axios from "axios";
import { API_URL } from "../../api";

/**
 * ContactUs component displays contact information and details.
 *
 * @component
 * @returns {JSX.Element} - The ContactUs component.
 */


const ContactUs = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
    axios.post(
      `${API_URL}/api/v1/contact`,
          conFom,
    )
    setFormStatus('Send')
  }
  return (
    <section id="contact" className="h-100 gradient-form">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xxl-12">
            <div className="card rounded-3 text-black">
              <div className="card-body p-md-5 mx-md-4">
                <div className="row">
                  <div className="col-md-6">
                  <div className="container mt-5">
      <h2 className="mb-3">Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className="form-control" id="message" required />
        </div>
        <button className="btn btn-danger" type="submit">
          {formStatus}
        </button>
      </form>
    </div>
                  </div>
                  <div className="col-md-6 mb-4 mr-4">
                    <div>
                      <img src={Logo} alt="logo" style={{ width: "185px" }} />
                      <h1 className="mt-3 mb-5 pb-1">For more details</h1>
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
