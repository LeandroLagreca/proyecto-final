const { User } = require("../db");
const { firebaseApp } = require("../firebase/credenciales");
const { Op } = require("sequelize");
const {
  createUserWithEmailAndPassword,
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} = require("firebase/auth");

const UserPost = async (req, res) => {
  const auth = getAuth(firebaseApp);
  function hashFunction(key) {
    const splittedWord = key.toLowerCase().split("");
    const codes = splittedWord.map(
      (letter) => `${letter}${String(letter).charCodeAt(0)}`
    );
    return codes.join("");
  }
  const { email, password, prevCart } = req.body;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = await User.create({
      id: user.uid,
      email,
      name: email,
      password: hashFunction(password),
    });
    await newUser.update({ cart: prevCart });
    
        res.status(201).json({msg: "User create!"})

} catch {
    res.status(400).json({msg: "User not create!"});
}
}

const getDbById = async (id) => {
  return await User.findByPk(id);
};

const UserByName = async (req, res) => {
  const { name } = req.body;
  if (name) {
    try {
      console.log(name);
      let found = await User.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } }
      });

      if (found) {
        res.status(200).send(found);
      } else {
        res.status(404).send({ msg: "user not found" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).send({ msg: "a name is required by body" });
  }
};
const UserByID = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await getDbById(id);
    return res.status(200).json(user);
  } catch {
    return res.status(400).send("User does not exist");
  }
};

const allDataUser = async (req, res) => {
  const { filter = '' } = req.query;
  const { name } = filter
  const where = {}
  if(name){
    where.name = {
      [Op.iLike]: `%${name}%`
    }
  }

  try {
    const info = await User.findAll({where});
    if (info.length === 0) {
      res.send("User does not exist");
    } else {
      res.status(200).json(info);
    }
  } catch (error) {
    res.status(400).json({ error: "Error User" });
  }
};


const UserUpdate = async (req, res) => {
  const { id } = req.params;
  const props = { ...req.body };
  try {
    let modifique = await User.update(
      props,

      {
        where: {
          id: id,
        },
      }
    );
    
    res.status(200).json({ msg: `User ${modifique.name} update successfully` });
  } catch (error) {
    res.status(400).json({ error: "Error update User" });
  }
};

const PostLogin= async (req, res) => {
    const {available} = req.body;
    if(available === false){
        res.status(400).send('User does not available')
    }else{
    const {email} = req.body;
    try {
        let found = await User.findOne({ where: { email: email} });
            if (found) {
            return res.status(200).send(found);
            } else {
            return res
                .status(404)
                .send({ msg: "sorry, this email is not exist" });
            }
        } catch (error) {
            res.status(400).send(error)
        }
        };

    }
module.exports= {
    allDataUser,
    UserByID,
    UserByName,
    UserPost,
    UserUpdate,
    PostLogin,
};