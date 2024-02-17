import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { BaseResponses } from '../models/responses/response';
// Инициализируем модели Sequelize
const initedSequlizeModels = require('../models/index.js');
import { TAddUserRequest } from '../types/requests/TUserRequests';
const models = initedSequlizeModels.sequelize.models as any;

// Получить всех пользователей
router.get('/', async function (_req: Request, res: Response) {
  const users = await models.User.findAll();

  res.json(BaseResponses.getSuccessResponse({ users: users }));
});

// Получить пользователя
router.get('/get/:userId/', async function (req: Request, res: Response) {
  const userId = req.params?.userId;
  const user = await models.User.findByPk(userId);

  if (!user) res.json(BaseResponses.getErrorResponse({ message: 'No such user' }))

  res.json(BaseResponses.getSuccessResponse({ user: user }));
});

// Добавить пользователя
router.use('/put/', function(req: Request, res: Response, next: NextFunction): any {
  const isCorrect = function (user: TAddUserRequest|any) { return typeof user.name === "string" && !!user.name };
  if (!isCorrect({ name: req?.body.name })) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid UserData' }));
  next();
},);
router.put('/put/', async function (req: Request, res: Response) {
  const userData = { name: req?.body.name };
  const newUser = await models.User.build({ ...userData });
  const result = await newUser.save();

  res.json(BaseResponses.getSuccessResponse({ result }));
});

// @ts-ignore
router.use('/change/:userId/', async function (req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const user = await models.User.findByPk(req.params.userId);
  // @ts-ignore
  req.user = user;
  if (!user) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid UserData' }))
  next();
});

router.post('/change/:userId/', async function (req: Request, res: Response) {
  // @ts-ignore
  const user = req.user;

  user.name = req.body.name ?? user.name;
  const result = await user.save();

  res.json(BaseResponses.getSuccessResponse({ ...result }));
});

module.exports = router;
