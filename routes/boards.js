import express from "express";
 
import boardJoiSchema from '../models/boards.js';

import { isEmptyBody } from "../middlewares/index.js";

import { isValideBody } from "../decorators/index.js";

import { authenticate, isValidId } from '../middlewares/index.js';

import  boardControllers from '../controllers/boardConrollers.js';


const boardRouter = express.Router();
boardRouter.get('/', boardControllers.getAllBoards);

boardRouter.post('/newboard', isEmptyBody, isValideBody(boardJoiSchema),boardControllers.createBoard);


boardRouter.delete('/:id', isValidId,boardControllers.deleteBoardById)





export default boardRouter;