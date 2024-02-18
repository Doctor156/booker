import express, { NextFunction, Request, Response } from "express";
import { BaseResponses } from '../helpers/responses/response';
import { TAddBookRequest } from '../types/requests/TAddRequests';
import { EBookTypes } from "../types/enums/EBookTypes";
import { notEmpty } from "../helpers/validators/notEmpty";
import { isInEnum } from "../helpers/validators/isInEnum";
import { Op } from "sequelize";
import { TGenre } from "../types/TGenre";

const { Book, Author, Genre } = require('../models');

const router = express.Router();


// Получить все книги
router.get('/', async function (_req: Request, res: Response) {
  res.json(BaseResponses.getSuccessResponse({ books: await Book.findAll() }));
});

// Получить книгу
router.get('/get/:bookId/', async function (req: Request, res: Response) {
  const book = await Book.findByPk(req.params?.bookId, { include: [ { model: Genre, as: 'genres' }] });

  if (!book) res.json(BaseResponses.getErrorResponse({ message: 'No such book' }))

  res.json(BaseResponses.getSuccessResponse({ book: book }));
});

// Добавить книгу
router.use('/', async function(req: Request, res: Response, next: NextFunction): Promise<any> {
  // Проверям что автор книги существует
  const author = await Author.findByPk(req?.body.author_id);
  if (!author) return res.json(BaseResponses.getErrorResponse({ message: 'Author not found' }))

  // Проверяем что такой формат типа книги существует
  if (!isInEnum(req?.body.type, EBookTypes) || !notEmpty(req?.body.type)) return res.json(BaseResponses.getErrorResponse({ message: "Not such 'type'"}));

  if (notEmpty(req?.body.genres)) {
    const ids = req?.body.genres.split(',').map((id: string) => { return { id: id }});
    const genres = await Genre.findAll({ where: { [Op.or]: ids}}) as { dataValues: TGenre }[];

    if (genres.length !== ids.length) return res.json(BaseResponses.getErrorResponse({ message: "Invalid genres"}));

    req.body.genres = genres.map((genre) => genre.dataValues);
  }

  // Валидация полей
  const isCorrect = function (book: TAddBookRequest|any) {
    return notEmpty(book.name) && notEmpty(book.type);
  };

  if (!isCorrect({ name: req?.body.name, type: req?.body.type })) return res.json(BaseResponses.getErrorResponse({ message: 'Invalid BookData' }));
  next();
});

router.put('/add/', async function (req: Request, res: Response) {
  let bookData = { name: req?.body.name, type: req?.body.type, author_id: req?.body.author_id } as TAddBookRequest;

  const newBook = await Book.create({ ...bookData });
  if (!!req?.body.genres) newBook.setGenres(req?.body.genres.map((genre: TGenre) => genre.id));

  res.json(BaseResponses.getSuccessResponse(newBook));
});

router.use('/update/:bookId/', async function (req: Request<{ bookId: string }>, res: Response, next: NextFunction): Promise<any> {
  const book = await Book.findByPk(req?.params.bookId);

  req.body.book = book;
  if (!book) return res.json(BaseResponses.getErrorResponse({ message: 'No such Book' }))
  next();
});

router.post('/update/:bookId/', async function (req: Request, res: Response) {
  const book = req.body.book;

  book.name = req.body.name ?? book.name;
  const result = await book.save();

  if (!!req?.body.genres) book.setGenres(req?.body.genres.map((genre: TGenre) => genre.id));


  res.json(BaseResponses.getSuccessResponse({ ...result }));
});

module.exports = router;
