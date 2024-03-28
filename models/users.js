
import {Schema, model} from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from './hook.js';
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
     required: [true, 'Email is required'],
     match: emailRegexp,
    unique: true,
  },
  token: {
    type: String,
  },
    
}, {versionKey: false, timestamps: true})

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate',  addUpdateSettings);

userSchema.post('findOneAndUpdate', handleSaveError);

export const userRegisterSchema = Joi.object({
   name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userloginSchema = Joi.object({
      email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const User = model("user", userSchema);

export default User;