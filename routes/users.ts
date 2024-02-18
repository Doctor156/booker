import express, { NextFunction, Request, Response } from "express";
import { BaseResponses } from '../helpers/responses/response';
import { TAddUserRequest } from '../types/requests/TAddRequests';
import { TModelStatic } from "../types/requests/TSequlizeModel";
import { notEmpty } from "../helpers/validators/notEmpty";

// Инициализируем модели Sequelize
const initedSequlizeModels = require('../models');
const router = express.Router();
const models = initedSequlizeModels.sequelize.models as { User: TModelStatic };

// Получить всех пользователей
router.get('/', async function (_req: Request, res: Response) {
  res.json(BaseResponses.getSuccessResponse({ users: await models.User.findAll() }));
});

// Получить пользователя
router.get('/get/:userId/', async function (req: Request, res: Response) {
  const user = await models.User.findByPk(req.params?.userId);

  if (!user) res.json(BaseResponses.getErrorResponse({ message: 'No such user' }))

  res.json(BaseResponses.getSuccessResponse({ user: user }));
});

// Добавить пользователя
router.use('/add/', function(req: Request, res: Response, next: NextFunction): any {
  const isCorrect = function (user: TAddUserRequest|any) { return notEmpty(user.name) };
  if (!isCorrect({ name: req?.body.name })) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid UserData' }));
  next();
},);

router.put('/add/', async function (req: Request, res: Response) {
  const userData = { name: req?.body.name };
  const newUser = models.User.build({...userData});
  const result = await newUser.save();

  res.json(BaseResponses.getSuccessResponse({ result }));
});

router.use('/update/:userId/', async function (req: Request<{ userId: string }>, res: Response, next: NextFunction): Promise<any> {
  const user = await models.User.findByPk(req.params.userId);
  // @ts-ignore
  req.user = user;
  if (!user) return res.json(BaseResponses.getErrorResponse({ message: 'No such user' }))
  next();
});

router.post('/update/:userId/', async function (req: Request, res: Response) {
  // @ts-ignore
  const user = req.user as User;

  user.name = req.body.name ?? user.name;
  const result = await user.save();

  res.json(BaseResponses.getSuccessResponse({ ...result }));
});

module.exports = router;
