const { Comment, User, Videogame, VideogameComment } = require("../db");
const { Router } = require("express");
const router = Router();

const postComment = async (req, res) => {
  let { userID } = req.body;
  let { gameID } = req.body;
  let { text, rating_like, rating_dislike, image, userComment } = req.body.comment;
  try {
    if (text && text.length > 1) {
      if (gameID && userID) {
        let game = await Videogame.findOne({ where: { id: gameID } });
        let user = await User.findOne({ where: { id: userID } });
        if (game !== null && user !== null) {
          let newComment = await Comment.create({
            text: text,
            userComment: userComment,
            image: image,
            rating_dislike: rating_dislike,
            rating_like: rating_like,
            videogameId: gameID,
            userId: userID
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
            "image",
            "rating_like",
            "rating_dislike",
            "createdAt",
            "id",
            'videogameId'
          ],
          through: { attributes: [] },
        },
      });

      if (allComments) {
        res.status(200).send(allComments);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    }
  } catch (error) {
  }
};


const getGameComments = async (req, res) => {
  let { gameID } = req.query;
  if(!gameID) return res.status(401).send('El ID del juego es requerido')
  try {
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
            "image",
            "createdAt",
            "updatedAt",
            "id",
          ],
          through: { attributes: [] },
        },
      });
      
      if (allComments.comments.length>0) {
        res.status(200).send(allComments);
      } else {
        res.status(200).json([]);
      }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const updateComment = async (req, res) => {
  let props = {...req.body};
  try {
    let find = await Comment.findOne({ where: { id: props.id } });
    if (find) {
      await Comment.update({
        text: props.text ? props.text : find.text,
        rating_like: props.rating_like ? props.rating_like : find.rating_like,

      }, {
          where: {
              id: props.id,
          }
      });
      
      return res.send({ msg: "Comment updated successfully" });
    }
    res.send({ msg: "Comment doesn't exist" });
  } catch (error) {
    res.status(404).send(error);
  }
};


module.exports = { postComment, getUserComments, getGameComments, updateComment };
