const express = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(
	'sk_test_51Luf96F1iznuqvKCT7jC3DamwdNOL0Kh51ceHPU7K5woSIqxWDy6qtrTk7wYVHg4nIugjWSSdDmz42bVfyIbRQm9009iugAVv2'
);


const postPayment = async (req, res) => {
    // you can get more data to find in a database, and so on
    const { id, amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'Videogame',
            payment_method: id,
            confirm: true, //confirm the payment at the same time
        });

        console.log(payment);

        return res.status(200).json({ message: 'Successful Payment' });
    } catch (error) {
        console.log(error);
        return res.json({ message: error.raw.message });
    }
}


module.exports = {
    postPayment
}