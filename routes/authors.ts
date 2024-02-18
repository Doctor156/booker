import express, { NextFunction, Request, Response } from "express";
import { BaseResponses } from '../helpers/responses/response';
import { TAddAuthorRequest } from '../types/requests/TAddRequests';
import { notEmpty } from "../helpers/validators/notEmpty";

// Инициализируем модели Sequelize
const router = express.Router();
const { Author, Book } = require('../models');

// Получить всех авторов
router.get('/', async function (_req: Request, res: Response) {
  res.json(BaseResponses.getSuccessResponse({ authors: await Author.findAll() }));
});

// Получить автора
router.get('/get/:authorId/', async function (req: Request, res: Response) {
  const author = await Author.findByPk(req.params?.authorId, { include: { model: Book, } });

  if (!author) res.json(BaseResponses.getErrorResponse({ message: 'No such author' }))

  res.json(BaseResponses.getSuccessResponse({ author: author }));
});

// Добавить автора
router.use('/add/', function(req: Request, res: Response, next: NextFunction): any {
  const isCorrect = function (author: TAddAuthorRequest|any) { return notEmpty(author.name) };
  if (!isCorrect({ name: req?.body.name })) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid AuthorData' }));
  next();
},);

router.put('/add/', async function (req: Request, res: Response) {
  const authorData = { name: req?.body.name };
  const newAuthor = Author.build({...authorData});
  const result = await newAuthor.save();

  res.json(BaseResponses.getSuccessResponse({ result }));
});

router.use('/update/:authorId/', async function (req: Request<{ authorId: string }>, res: Response, next: NextFunction): Promise<any> {
  const author = await Author.findByPk(req.params.authorId);

  req.body.author = author;
  if (!author) return res.json(BaseResponses.getErrorResponse({ message: 'No such Author' }))
  next();
});

router.post('/update/:authorId/', async function (req: Request, res: Response) {
  const author = req.body.author;

  author.name = req.body.name ?? author.name;
  const result = await author.save();

  res.json(BaseResponses.getSuccessResponse({ ...result }));
});

module.exports = router;
