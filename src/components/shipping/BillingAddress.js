import React, { useState } from 'react'
import './billing.css'
import { Country, State }  from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { saveBillingInfo } from '../../actions/cartAction';
import MetaData from '../MetaData';
import CheckoutSteps from './CheckoutSteps';

/**
 * Shipping component displays the form for entering shipping details.
 *
 * @returns {JSX.Element} The rendered Shipping component.
 */
const Shipping = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()


    const {shippingInfo} = useSelector((state) => state.cart)
    //const {billingInfo} = useSelector((state) => state.cart)


    const [fname, setfname] = useState(shippingInfo.fname)
    const [lname, setlname] = useState(shippingInfo.lname)
    const [address, setAddress] = useState(shippingInfo.address)
    const [OptionalAddress, setOptionalAddress] = useState(shippingInfo.OptionalAddress)
    const [farmAddress, setFarmAddress] = useState(shippingInfo.farmAddress)
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  
     /**
   * Handles the form submission for shipping details.
   *
   * @param {Event} e - The form submit event.
   */
  
    const shippingSubmit = (e) => {
        e.preventDefault();
    
        if (phoneNo.length < 10 || phoneNo.length > 10) {
          alert.error("Phone Number should be 10 digits Long");
          return;
        }
        dispatch(
          saveBillingInfo({fname,lname, address,OptionalAddress,farmAddress, city, state, country, pinCode, phoneNo })
        );
            navigate("/order/confirm");
      };
  return <>
    <MetaData title="Billing Details" />

    <CheckoutSteps activeStep={1} />

    <div className="billingContainer">
        <div className="billingBox">
          <h2 className="billingHeading">Billing Details</h2>
          <p>We cannot change addresses after checkout.</p>
          <form
            className="billingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <input
                type="text"
                placeholder="First Name (Required)"
                required
                value={fname}
                onChange={(e) => setfname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name (Required)"
                required
                value={lname}
                onChange={(e) => setlname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address (Required)"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address (Optional)"
                value={OptionalAddress}
                onChange={(e) => setOptionalAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Farm (Optional)"
                value={farmAddress}
                onChange={(e) => setFarmAddress(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="City (Required)"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Pin Code (Required)"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Phone Number (Required)"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
        </form>
        </div>
    </div>
  </>
}

export default Shipping