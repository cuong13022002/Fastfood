const { Orders } = require("../models/orders.js");
const express = require("express");
const router = express.Router();
const stripe = require("stripe")('sk_test_51QRy6LD1axMHAlrF7zOyWnbYBDAQF8HDTxVcHPZDzXx8sINsouOLXdC9YkATZS0En6BhEKVQugvA1K4OObCm62gr00EKBeQveK');

router.post("/", async (req, res) => {
  const products = req.query.products;
  const lineItems = products.map((product) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: product.productTitle,
          images: [product.image],
          unit_amount: product.price * 100,
        },
      },
      quantity: product.quantity,
    
  }));
  const customer = await stripe.customers.create({
    metadata:{
        userId: req.body.userId,
        cart: JSON.stringify(lineItems)
    }
  })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    phone_number_collection:{
        enabled:true,
    },
    customer:customer.id,
    line_items:lineItems,
    mode:"payment",
    shipping_address_collection:{
        allowed_countries:['US','VN']
    },
    success_url: `${process.env.CLIENT_BASE_URL}/payment/complete/{CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3006/cancel",
  });
  res.json({id:session.id})
});



router.get("/payment/complete", async (req, res) => {
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(req.query.session_id, {
      expand: ["payment_intent.payment_method"],
    }),
    stripe.paymentIntents.retrieve(result.payment_intent.payment_intent_id),
  ]);
  res.status(200).send(JSON.stringify(await result));
});

router.get("/cancel", (req, res) => {
  res.redirect("/");
});
const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);
  const newOrder = new Orders({
    userId: customer.metadata.userId,
    customerId: customer.id,
    paymentIntentId: data.payment_intent,
    products: items,
    subtotal: parseInt(data.amount_subtotal / 100),
    total: parseInt(data.amount_total / 100),
    shiping: data.customer_details,
    payment_status: data.payment_status,
  });
  return await newOrder.save();
};
let endpointSecret="";

router.post('/webhook',express.raw({type:'application/json'}), (req, response) => {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    if(endpointSecret){
        let event;
        try{
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        }
        catch(err){
            console.log(`Error deconstructing event: ${err.message}`);
           
        }
    }
})
module.exports = router;