const { Question, User, Videogame } = require("../../db");
const { someError } = require('./utils')
const createQuestion = async (req, res) => {
  const { userId, gameId, text } = req.body;
	if(someError(...req.body)) return res.status(401).send('Faltan parametros requeridos')
  try {
    const newQuestion = await Question.create({
      text,
			userId
    });
		const findUser = await User.findOne({
			where: {id: userId}
		})
		const findGame = await Videogame.findOne({
			where: {id: gameId}
		})
		await newQuestion.addUser(findUser)
		await newQuestion.addVideogame(findGame)
		res.status(201).json({
			msg: 'Question created successfully',
			question: newQuestion
		})
  } catch (error) {
			res.send(400).status(error.message)
	}
};

module.exports = {
	createQuestion
};
