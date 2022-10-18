const { Comment, User, Videogame } = require("../db");
const { Router } = require("express");
const router = Router();

const postComment = async (req, res) => {
  let { userID } = req.body;
  let { gameID } = req.body;
  let { text, rating_like, rating_dislike } = req.body.comment;
  try {
    if (text && text.length > 1) {
      let newComment = await Comment.create({
        text: text,
        rating_dislike: rating_dislike,
        rating_like: rating_like,
      });

      let game = await Videogame.findOne({ where: { id: gameID } });
      let user = await User.findOne({ where: { id: userID } });
      if (game && user) {
        let gameName = await game.name;
        let userName = await user.name;
        await game.addComment(newComment);
        await user.addComment(newComment);
        res.status(200).send(` ${userName} your comment about ${gameName} was posted`);
      } else {
        res.status(404).send("you need to be logged in");
      }
    } else {
      res
        .status(400)
        .json({ msg: "please tell us more about your experience" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postComment };
