const { PurchaseOrder, Videogame, User } = require('../db');
const { Op } = require('sequelize');

const generarIdUnico = () => {
	return 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnn-nnnn-7nnn-tnnn-nnnnnnnnnnnn'.replace(
		/[nt]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'n' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
};

const createOrder = async (req, res) => {
	const { games, totalPrice } = req.body.bildData;
	const { saveData = false } = req.query;
	const {
		userID,
		cuit,
		dni,
		address,
		firstname,
		lastname,
		country,
		province,
		cardnumber,
		cardholder,
	} = req.body.userData;

	if (saveData) {
		try {
			//update user data
			let updatedUserData = await User.update(
				{
					cuit: cuit,
					dni: dni,
					address: address,
					firstname: firstname,
					lastname: lastname,
					country: country,
					province: province,
					cardnumber: cardnumber,
					cardholder: cardholder,
				},
				{ where: { id: userID } }
			);
		} catch (error) {
			console.log(error);
		}
	}

	try {
		//get game data
		let gameIDS = games.map((e) => {
			return e.id;
		});

		const gameInfo = games.map((e) => {
			return {
				id: e.id,
				name: e.name,
				price: e.price,
				cant: e.cant,
				code: generarIdUnico(),
				picture: e.picture,
			};
		});
		//restar stock
		games.map(async (game) => {
			await Videogame.findOne({ where: { id: game.id } }).then((Vgame) => {
				if (Vgame.stock <= 0) {
					return {
						status: 'failed',
						message: 'out of stock',
					};
				} else {
					Vgame.decrement('stock', { by: game.cant });
				}
			});
		});
		//
		const findGames = await Videogame.findAll({
			where: { id: { [Op.or]: [...gameIDS] } },
		});
		//create random codes

		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		function generateString() {
			let result = ' ';
			const charactersLength = characters.length;
			for (let i = 0; i < 10; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}

			return result;
		}
		let gameCodes = games.map((e) => {
			if (e.cant === 1) {
				return { game: e.name, code: generateString() };
			} else {
				let codes = [];
				for (let i = 0; i < e.cant; i++) {
					let code = generateString();
					let game = { game: e.name, code: code };
					codes.push(game);
				}
				return codes;
			}
		});
		//crear orden y asociarla
		let user = await User.findOne({ where: { id: userID } });
		if (user) {
			let newOrder = await PurchaseOrder.create({
				games: gameInfo,
				totalprice: totalPrice,
				userId: userID,
			});
			await newOrder.addVideogames(findGames);
			await user.addPurchaseOrder(newOrder);
			await user.addVideogames(findGames);
			return res.status(201).json({
				msg: 'Order created successfully',
				data: newOrder,
				gamesCodes: gameCodes,
			});
		} else {
			return res.status(404).send({ msg: 'thats not a valid userid' });
		}
	} catch (error) {
		console.log(error);
	}
};

const getUserOrders = async (req, res) => {
	let { id } = req.params;
	if (id) {
		try {
			let found = await User.findOne({
				where: { id: id },
				attributes: ['name', 'address'],
				include: [
					{
						model: PurchaseOrder,
						attributes: ['id', 'status', 'totalprice', 'date', 'games'],
						through: { attributes: [] },
					},
				],
			});
			if (found === null) {
				res.status(404).send("we couldn't match that userID");
			} else {
				res.send(found);
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		return res.status(404).send({ msg: 'an userID is required by params' });
	}
};
const getAllOrders = async (req, res) => {
	const { filter = '' } = req.query;
	const { date, status, name } = filter;
	const where = {};

	if (status) {
		where.status = status;
	}

	if (name) {
		where.name = {
			[Op.iLike]: `%${name}%`,
		};
	}

	try {
		const orders = await PurchaseOrder.findAll({
			attributes: ['id', 'games', 'status', 'totalprice', 'date'],
			where,
			include: {
				model: User,
				attributes: ['name', 'email', 'id'],
			},
		});
		if (!orders.length) {
			return res.status(404).send("Couldn't find any order");
		}
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};
const ChangeStatePurchaseOrder = async (req, res) => {
	let { status } = req.body;
	let { id } = req.params;
	if (status && id) {
		try {
			let finalState = await PurchaseOrder.update(
				{ status },
				{ where: { id: id } }
			);
			res.status(200).send({ msg: 'up to date' });
		} catch (error) {
			res.status(404).send({ msg: error });
		}
	}
};
module.exports = {
	getAllOrders,
	createOrder,
	getUserOrders,
	ChangeStatePurchaseOrder,
};
