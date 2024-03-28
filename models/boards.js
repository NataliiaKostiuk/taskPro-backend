import {Schema, model} from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from './hook.js';

const boardSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
       
    }
}, { versionKey: false, timestamps: true })

    
boardSchema.post('save', handleSaveError);

boardSchema.pre('findOneAndUpdate',  addUpdateSettings);

boardSchema.post('findOneAndUpdate', handleSaveError);

export const boardJoiSchema = Joi.object({
    name: Joi.string().required(),
    
});

const Board = model('board', boardSchema);

export default Board;