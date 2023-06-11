import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Checkoutform from "./Checkoutform";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
const Payment = () => {
  let { state } = useLocation();
  const enrolledDetails = state.classDetails;
  const {
    classId,
    instructorName,
    isEnrolled,
    name,
    paymentStatus,
    photo,
    price,
    studentEmail,
    _id,
  } = state.classDetails;

  return (
    <Elements stripe={stripePromise}>
      <Checkoutform enrolledDetails={enrolledDetails}></Checkoutform>
    </Elements>
  );
};

export default Payment;
