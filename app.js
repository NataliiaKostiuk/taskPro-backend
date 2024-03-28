import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import authRouter from './routes/api/users.js';
import boardRouter from "./routes/boards.js";

import bodyParser from "body-parser";
// const bodyParser = require('body-parser');

//  возвращает web server
const app = express()


// // Подключение body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))

//дозв запити з одного домену на інший
app.use(cors())
// app.use(express.json())

// мідлвара шлях відповідае роутеру
app.use('/api/auth', authRouter);
 app.use('/api/boards', boardRouter);

// если нет такого адреса
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
// все другие ошибки
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app
