const express = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(
	'sk_test_51LufTBJFaEjO8LKN5DWshFaz1Eg7gfkp6hE6bJMkvlHB7m1OOqVUCQbLu5FVk6MaCFV1yLHQb9ruGXK6flrtfS2T00Av2FLP4C'
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

		return res.status(200).json({ message: 'Successful Payment' });
	} catch (error) {
		return res.json({ message: error.raw.message });
	}
};

module.exports = {
	postPayment,
};
