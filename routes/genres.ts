import express, { NextFunction, Request, Response } from "express";
import { BaseResponses } from '../helpers/responses/response';
import { TAddGenreRequest } from '../types/requests/TAddRequests';
import { TModelStatic } from "../types/requests/TSequlizeModel";
import { notEmpty } from "../helpers/validators/notEmpty";

// Инициализируем модели Sequelize
const initedSequlizeModels = require('../models');
const router = express.Router();
const models = initedSequlizeModels.sequelize.models as { Genre: TModelStatic };

// Получить все жанры
router.get('/', async function (_req: Request, res: Response) {
  res.json(BaseResponses.getSuccessResponse({ books: await models.Genre.findAll() }));
});

// Получить жанр по ID
router.get('/get/:genreId/', async function (req: Request, res: Response) {
  const user = await models.Genre.findByPk(req.params?.genreId);

  if (!user) res.json(BaseResponses.getErrorResponse({ message: 'No such user' }))

  res.json(BaseResponses.getSuccessResponse({ user: user }));
});

// Добавить жанр
router.use('/add/', function(req: Request, res: Response, next: NextFunction): any {
  const isCorrect = function (genre: TAddGenreRequest|any) { return notEmpty(genre.name) };
  if (!isCorrect({ name: req?.body.name })) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid GenreData' }));
  next();
},);

router.put('/add/', async function (req: Request, res: Response) {
  const genreData = { name: req?.body.name };
  const newGenre = models.Genre.build({...genreData});
  const result = await newGenre.save();

  res.json(BaseResponses.getSuccessResponse({ result }));
});

router.use('/update/:genreId/', async function (req: Request<{ genreId: string }>, res: Response, next: NextFunction): Promise<any> {
  const genre = await models.Genre.findByPk(req.params.genreId);
  // @ts-ignore
  req.genre = genre;
  if (!genre) return res.json(BaseResponses.getErrorResponse({ message: 'No such Genre' }))
  next();
});

router.post('/update/:genreId/', async function (req: Request, res: Response) {
  // @ts-ignore
  const genre = req.genre as Genre;

  genre.name = req.body.name ?? genre.name;
  const result = await genre.save();

  res.json(BaseResponses.getSuccessResponse({ ...result }));
});

module.exports = router;
