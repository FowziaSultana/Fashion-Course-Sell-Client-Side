import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../Providers/AuthProviders";
import "./Checkoutform.css";
import { toast } from "react-hot-toast";

const Checkoutform = ({ enrolledDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

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
  } = enrolledDetails;

  const totalPrice = parseFloat(price.toFixed(2));
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { totalPrice }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      //console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        studentEmail,
        transactionId: paymentIntent.id,
        price: totalPrice,
        date: new Date(),
        classId,
        classesName: name,
        instructorName,
        enrolledClassId: _id,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        toast.success("your payment is succesfully done");
      });
    }
  };

  return (
    <div className="w-3/4 h-[400px] p-10 mx-auto ">
      <h1 className="text-tahiti text-4xl mb-8"> Make Your payment</h1>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-error mt-8 "
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && (
        <p className="text-tahiti font-semibold mt-5">{cardError}</p>
      )}
      {transactionId && (
        <p className="text-blue-500">
          Your transaction is completed , your transaction Id: {transactionId}
        </p>
      )}
    </div>
  );
};

export default Checkoutform;
