require('dotenv').config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payment/create", async (req, res) => {
  const { total } = req.body;
  if (!total) return res.status(400).send({ error: "Total is required" });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
  });

  res.status(201).send({ clientSecret: paymentIntent.client_secret });
});

exports.api = functions.https.onRequest(app); // ✅ export Express app
