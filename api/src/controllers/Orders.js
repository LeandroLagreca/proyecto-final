const { PurchaseOrder } = require('../db')

const getAllOrders = async (req, res) => {
	try {
		const orders = await PurchaseOrder.findAll()
		if(!orders.length) {
			return res.status(404).send('Dont exist any order yet')
		}
		res.json(orders)
	} catch (error) {
			res.status(400).json({error: error.message})
	}
	
}

module.exports = {
    getAllOrders
}