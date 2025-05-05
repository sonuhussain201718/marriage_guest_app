const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
    key_id: 'rzp_test_gdRtov5u9NAa6x',
    key_secret: 'zxPwxiMIBnDZwOBUfIyYB7hp'
});

router.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order');
    }
});

module.exports = router;
