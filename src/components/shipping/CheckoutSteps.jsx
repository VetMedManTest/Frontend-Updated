import React from 'react'
import {MdRadioButtonChecked } from 'react-icons/md'
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import "./CheckoutSteps.css";

const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <MdRadioButtonChecked />
        },
        {
            label: <Typography>Billing Address</Typography>,
            icon: <MdRadioButtonChecked />
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon: <MdRadioButtonChecked />
        }
    ]
    const stepStyles = {
        boxSizing: "border-box",
      };
  return <>
<Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "green" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
  </>
}

export default CheckoutSteps