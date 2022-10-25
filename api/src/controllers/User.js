const { User } = require('../db');
const {firebaseApp}=require('../firebase/credenciales')
const { createUserWithEmailAndPassword , getAuth, sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink
} = require("firebase/auth");

const UserPost = async (req, res)=> {
    const auth = getAuth(firebaseApp);
    function hashFunction(key) {
        const splittedWord = key.toLowerCase().split("");
        const codes = splittedWord.map((letter) => `${letter}${String(letter).charCodeAt(0)}`);
        return codes.join("");
    }
    const { email, password } = req.body
    try{
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    ) 
    await User.create({
        id: user.uid,
        email,
        available,
        name: email,
        password: hashFunction(password)
    })
    const actionCodeSettings = {
        url: 'http://localhost:3000/',
        handleCodeInApp: true,
        };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    res.status(201).json({msg: "User create!"})
} catch {
    res.status(400).json({msg: "User not create!"});
}
}

const getDbInfo = async () => {
    return await User.findAll();
};
const getDbById = async (id) => {
    return await User.findByPk(id);
};

const UserByID = async (req, res) => {
    const { id } = req.params  
    try {
        let user = await getDbById(id);
        return res.status(200).json(user)
    } catch {
        return res.status(400).send('User does not exist')
    }
};


const allDataUser = async (req, res) => {
    const {name} = req.query;
    const info = await getDbInfo();
    try {
                if (info.length === 0) {
                    res.send("User does not exist");
                } else {
                    res.status(200).json(info)
    } }
    catch (error) {
        res.status(400).json({error: "Error User"});
    }
};


const UserUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, image, password, email, admin, available } = req.body
    try {
        let modifique = await User.update({ name, image, password, email, admin, cart, deseos, biblioteca, available } ,
            {
                where: {
                    id: id,
                }
            })
        
    res.status(200).json({msg: `User ${name} update successfully`})
    }
    catch (error) { 
        res.status(400).json({error: "Error update User"});
    }
};


const PostLogin= async (req, res) => {
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


module.exports={
    allDataUser,
    UserByID,
    UserPost,
    UserUpdate,
    PostLogin
}