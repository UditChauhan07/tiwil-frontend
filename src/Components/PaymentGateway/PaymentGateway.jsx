import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51Qggm609hURoLVLqTLaCHNrvrILGnDJXT9eGxaAzxyYmpTRJpJlkePL0N3oi9MR5NmV9fXdoKR03CHB4980z5pCS00hIk82DJ0"
);

function PaymentForm() {
  const cardStyle = {
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
  };
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    try {
      // Create PaymentIntent using axios
      const response = await axios.post(
        "http://localhost:3839/create-payment-intent",
        {
          amount: 1000,
        }
      );
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { clientSecret } = response.data;

      // Confirm card payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: { name: "dummy" },
        },
      });
      console.log(paymentResult);

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setSuccess(false);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setError(null);
        setSuccess(true);
      }
    } catch (err) {
      // Handle errors
      console.log("error in payment", err);
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-5">
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            boxShadow: 3,
            padding: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" mb={2} align="center">
            Payment Details
          </Typography>

          <Box mb={2}>
            <Typography variant="subtitle1" mb={1}>
              Card Number
            </Typography>
            <CardNumberElement options={cardStyle} />
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" mb={1}>
              Expiry Date
            </Typography>
            <CardExpiryElement options={cardStyle} />
          </Box>

          <Box mb={2}>
            <Typography variant="subtitle1" mb={1}>
              CVC
            </Typography>
            <CardCvcElement options={cardStyle} />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!stripe || isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" mt={2}>
              Payment Successful!
            </Typography>
          )}
        </Box>
      </form>
    </div>
  );
}

function PaymentGateway() {
  return (
    <div>
      <h1 className="text-center mt-3">PAYMENT GATEWAY</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default PaymentGateway;
