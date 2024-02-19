import express, { NextFunction, Request, Response } from "express";
import { BaseResponses } from "../helpers/responses/response";
import * as crypto from 'crypto';
import { User }  from '../models'

const router = express.Router();


// Если у нас есть аус токен то ищем по нему пользователя, вполне уверен что есть библиотека, которая это делает, но это тестовое, потому делаю сам
router.use(async function(req: Request, _res: Response, next: NextFunction) {
    if (!!req.headers.authtoken) {
        // Вообще, этому наверное место в условном сторе.
        const user = await User.findOne({ where: { authToken: req.headers.authtoken }});

        req.body.user = user?.dataValues ?? null;
    }

    next();
});

router.post('/auth/get-token/',async function (req: Request, res: Response): Promise<any> {
    if (!!req.body.user) return res.json(BaseResponses.getErrorResponse({ message: 'You already logged in' }));

    if (!req.body.name || !req.body.password) res.json(BaseResponses.getErrorResponse({ message: 'Fill password and name' }));
    if (!!req.body.name && !!req.body.password) {
        const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");
        const pass = md5(req.body.password).toString();

        const getUserByNamePass = async () => await User.findOne({ where: { name: req.body.name, password: pass}});
        const user = await getUserByNamePass() as any;

        if (!user) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid data', res: pass }));

        user.authToken = md5((new Date()).toString() + user.name);
        user.save();

        return res.json(BaseResponses.getErrorResponse({ authToken: user.authToken }));
    }
},);

export = router;
