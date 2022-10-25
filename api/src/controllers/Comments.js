const { Comment, User, Videogame, VideogameComment } = require("../db");
const { Router } = require("express");
const router = Router();

const postComment = async (req, res) => {
  let { userID } = req.body;
  let { gameID } = req.body;
  let { text, rating_like, rating_dislike, userComment } = req.body.comment;
  try {
    if (text && text.length > 1) {
      if (gameID && userID) {
        let game = await Videogame.findOne({ where: { id: gameID } });
        let user = await User.findOne({ where: { id: userID } });
        if (game !== null && user !== null) {
          let newComment = await Comment.create({
            text: text,
            userComment: userComment,
            rating_dislike: rating_dislike,
            rating_like: rating_like,
          });
          let gameName = await game.name;
          let userName = await user.name;
          await game.addComment(newComment);
          await user.addComment(newComment);
          return res
            .status(200)
            .send(newComment);
        } else {
          return res.status(404).send("we couldn't match your user id/game id");
        }
      } else {
        return res.status(404).send("gameID and userID are required");
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
const getUserComments = async (req, res) => {
  let { userID } = req.query;

  try {
    if (userID) {
      let allComments = await User.findOne({
        where: { id: userID },
        attributes: ["name"],
        include: {
          model: Comment,
          attributes: [
            "text",
            "userComment",
            "rating_like",
            "rating_dislike",
            "createdAt",
            "id",
          ],
          through: { attributes: [] },
        },
      });
      console.log(allComments);

      if (allComments) {
        res.status(200).send(allComments);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getGameComments = async (req, res) => {
  let { gameID } = req.query;
  try {
    if (gameID) {
      let allComments = await Videogame.findOne({
        where: { id: gameID },
        attributes: ["name"],
        include: {
          model: Comment,
          attributes: [
            "text",
            "rating_like",
            "userComment",
            "rating_dislike",
            "createdAt",
            "id",
          ],
          through: { attributes: [] },
        },
      });
      
      if (allComments.comments.length>0) {
        res.status(200).send(allComments);
      } else {
        res.status(404).json({ msg: "There are no comments yet" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postComment, getUserComments, getGameComments };
