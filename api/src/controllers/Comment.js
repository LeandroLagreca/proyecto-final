const { Comment,Videogame,User } = require("../db");
const postComment = async (req, res) => {
  const { userID } = req.body;
  const { text, rating_like, rating_dislike, gameID } = req.body.comment;
  if (!text) {
    res.status(400).send({ msg: "the comment cannot be blank" });
  } else if (text.length < 3) {
    res
      .status(400)
      .send({ msg: "write at least 2 characters! an 'ok' its enought" });
  }
  try {
    let newComment= await Comment.create({
      text: text,
      rating_like: rating_like,
      rating_dislike: rating_dislike,
    });

    let game=await Videogame.findOne({where:{id:gameID}})
    let user=await User.findOne({where:{id:userID}})
    /* Videogame.addComment(newComment) */
    User.addComment(newComment)
    newComment.addUser(user)

    res.send({msg:"created succesfully"})
  } catch (error) {
    console.log(error)
  }
};
module.exports = { postComment };
