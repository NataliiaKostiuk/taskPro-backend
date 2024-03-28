import { HttpError } from "../helpers/index.js";
import { controllerWrapper } from "../decorators/index.js";
import Board from "../models/boards.js";


const getAllBoards = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Board.find({ owner }, "-createdAt -updatedAt");
    res.json({
        result,
    });
}

const createBoard = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Board.create({ ...req.body, owner });

    res.status(201).json(result);
}

const deleteBoardById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Board.findOneAndDelete({_id: id, owner});
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

export default {
getAllBoards: controllerWrapper(getAllBoards), 
createBoard: controllerWrapper(createBoard),
deleteBoardById: controllerWrapper(deleteBoardById),    
}