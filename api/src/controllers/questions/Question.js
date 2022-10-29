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

const answerQuestion = async (req, res) => {
	const { questionId } = req.params
	const { text } = req.body

	try {
		const findQuestion = await Question.findOne({
			where: {id: questionId}
		})
	
		if(!findQuestion) {
			return res.status(404).send('Dont exist any question with the gave id')
		} else {
			await findQuestion.update({
				answer: text
			})
			res.json(findQuestion)
		}
	} catch (error) {
			res.status(400).send(error.message)
	}
	
}

module.exports = {
	createQuestion
};
