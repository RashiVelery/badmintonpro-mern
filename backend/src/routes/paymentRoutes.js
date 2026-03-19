const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // paise/cents
            currency: 'inr',
        });

        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;