const { User } = require('../db');
const { Router } = require("express");
const router = Router();


const UserPost = async (req, res) => {
    try { 
        const { name, image, password, mail, admin } = req.body
        const newUser = await User.create({
            name,
            image,
            admin,
            password,
            mail
        })
        res.status(200).json(newUser);

    } catch (error) {
        res.status(400).json({error: "User not create!"});
    };
};

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

//arreglar esta ruta
const UserEliminated = async(req, res)=>{
    const { id } = req.params
    const searchId = await User.findByPk(id)
    if(!searchId) res.status(400).json({msg: "Not User"})
    try {
    await searchId.Destroy()
        res.status(200).json({msg: `The User ${id} has been removed`})
    } catch (error) {
        res.status(400).json({error: "Error eliminated User"});
    }
};

const UserUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, image, password, mail, admin } = req.body
    try {
        let modifique = await User.update({ name, image, password, mail, admin } ,
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




module.exports={
    allDataUser,
    UserByID,
    UserPost,
    UserEliminated,
    UserUpdate
}