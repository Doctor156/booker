import { Request, Response } from "express";
import express from 'express';
import authRouter from './auth';
import usersRouter from './users';
import genresRouter from './genres';
import booksRouter from './books';
import authorsRouter from './authors';


const router = express.Router();

router.use(authRouter);

/* GET home page. */
router.get('/', function(_req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});

// Круды
router.use('/users', usersRouter);
router.use('/genres', genresRouter);
router.use('/authors', authorsRouter);
router.use('/books', booksRouter);

export = router;
