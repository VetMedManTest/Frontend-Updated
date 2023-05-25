import React from "react";
import Logo from "../../assets/images/Logo.png";

const About = () => {
  return (
    <section id="about" className="h-100 gradient-form">
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xxl-12">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src={Logo}
                        alt="Vetmedman Logo"
                        style={{ width: "185px" }}
                      />
                      <h1 className="mt-3 mb-5 pb-1">ABOUT US</h1>
                    </div>
                    <p className="lead mb-4">
                      Are you someone who works with animals and related
                      products? At Vetmedman, we are passionate about providing
                      top-quality medical equipment and supplies for veterinary
                      doctors and hospitals. We strive for commitment,
                      excellence, and customer satisfaction.
                    </p>
                    <p className="mb-4">
                      Our products meet the highest standards of quality and
                      reliability, and we deal with a wide variety of equipment,
                      from syringes and vet machines to cages, vet instruments,
                      breeding products, and more. We work with leading
                      manufacturers to offer a wide range of products and
                      services tailored to meet the unique needs of each
                      customer.
                    </p>
                    <p className="mb-5">
                      Whether you're looking for a specific product or need help
                      improving treatment outcomes, our experienced team is here
                      to help. Browse our website to learn more about our
                      products and services, or contact us to speak with a
                      member of our team.
                    </p>
                    <div className="text-center">
                      <a
                        href="/products"
                        className="btn btn-lg btn-primary px-5"
                      >
                        Browse Products
                      </a>
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

export default About;
