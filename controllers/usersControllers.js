import { HttpError } from "../helpers/index.js";
import { controllerWrapper } from "../decorators/index.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;

const register = async (req, res) => {
    
       const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});
    
    res.status(201).json({
        user: {
            name:newUser.name,
            email: newUser.email
            
		},
	});
} 
 
const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    const {_id: id} = user;
    const payload = {
        id
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
     await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
        		user: {
            email: user.email,
		},
    })
}

const getCurrent = async(req, res)=> {
    const { email, subscription } = req.user;

    res.json({ 
        email,
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}

export default {
    register: controllerWrapper(register),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout:controllerWrapper(logout),
    
}