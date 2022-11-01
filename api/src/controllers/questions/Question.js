const { Question, User, Videogame } = require("../../db");
const { someError } = require("./utils");

const createQuestion = async (req, res) => {
  const { userId, gameId, text } = req.body;
  if (someError({ ...req.body }))
    return res.status(401).send("Faltan parametros requeridos");
  try {
    const newQuestion = await Question.create({
      text,
      userId,
    });
    const findUser = await User.findOne({
      where: { id: userId },
    });
    const findGame = await Videogame.findOne({
      where: { id: gameId },
    });
    await newQuestion.setUser(findUser);
    await newQuestion.setVideogame(findGame);
    res.status(201).json({
      msg: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const answerQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { text } = req.body;

  try {
    const findQuestion = await Question.findOne({
      where: { id: questionId },
    });

    if (!findQuestion) {
      return res.status(404).send("Dont exist any question with the gave id");
    } else {
      await findQuestion.update({
        answer: text,
      });
      res.json(findQuestion);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getQuestions = async (req, res) => {
  const { gameId, userId } = req.query
  const where = {};
  
  if(userId) {
		where.userId = userId
	}

	if(gameId) {
		where.videogameId = gameId
	}
  
  try {
    const questions = await Question.findAll({
			where,
      include: [
        {
          model: Videogame,
          attributes: ["name"],
        },
        {
          model: User,
					attributes: ["name", 'image', 'createdAt']
        },
      ],
    });

    if (!questions.length) {
      return res.status(404).send("Dont exist any question yet");
    } else {
      res.json(questions);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createQuestion,
  answerQuestion,
  getQuestions,
};
