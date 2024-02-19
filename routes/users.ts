import express, { NextFunction, Request, Response } from "express";
import { BaseResponses } from '../helpers/responses/response';
import { TAddUserRequest } from '../types/requests/TAddRequests';
import { notEmpty } from "../helpers/validators/notEmpty";
import crypto from "crypto";
import { User } from '../models';

// Инициализируем модели Sequelize
const router = express.Router();



// Получить всех пользователей
router.get('/', async function (_req: Request, res: Response) {
  res.json(BaseResponses.getSuccessResponse({ users: await User.findAll() }));
});

// Получить пользователя
router.get('/get/:userId/', async function (req: Request, res: Response) {
  const user = await User.findByPk(req.params?.userId);

  if (!user) res.json(BaseResponses.getErrorResponse({ message: 'No such user' }))

  res.json(BaseResponses.getSuccessResponse({ user: user }));
});

// Добавить пользователя
router.use(function(req: Request, res: Response, next: NextFunction): any {
  const isCorrect = function (user: TAddUserRequest|any) { return notEmpty(user.name) && notEmpty(user.password) };
  if (!isCorrect({ name: req?.body.name, password: req?.body.password })) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid UserData' }));
  next();
},);

router.put('/add/', async function (req: Request, res: Response) {
  const userData = { name: req?.body.name, password: req?.body.password };
  const newUser = User.build({...userData});
  const result = await newUser.save();

  res.json(BaseResponses.getSuccessResponse({ result }));
});

router.use('/update/:userId/', async function (req: Request<{ userId: string }>, res: Response, next: NextFunction): Promise<any> {
  const user = await User.findByPk(req.params.userId);
  // @ts-ignore
  req.user = user;
  if (!user) return res.json(BaseResponses.getErrorResponse({ message: 'No such user' }))
  next();
});

router.post('/update/:userId/', async function (req: Request, res: Response) {
  // @ts-ignore
  const user = req.user as User;

  const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");
  const pass = md5(req.body.password).toString();

  user.name = req.body.name ?? user.name;
  user.password = pass ?? user.password;
  const result = await user.save();

  res.json(BaseResponses.getSuccessResponse({ ...result }));
});

export = router;
