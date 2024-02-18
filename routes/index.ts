import { Request, Response } from "express";

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(_req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
