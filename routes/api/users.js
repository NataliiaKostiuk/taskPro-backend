import express from "express";

import  usersControllers from '../../controllers/usersControllers.js';

import { isEmptyBody, authenticate} from "../../middlewares/index.js";

import { userRegisterSchema,userloginSchema } from "../../models/users.js";

import validateBody from "../../decorators/isValideBody.js";


const authRouter = express.Router();
 
 authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), usersControllers.register);

authRouter.post("/login", isEmptyBody, validateBody(userloginSchema), usersControllers.login);
 
authRouter.get("/current", authenticate, usersControllers.getCurrent);

authRouter.post("/logout",authenticate, usersControllers.logout);

export default authRouter;