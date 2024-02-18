'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db: any = {};
const enviroment = require("dotenv").config();



const sequelize = new Sequelize({
    ...config,
    'username': enviroment.parsed.POSTGRES_USER,
    'password': enviroment.parsed.POSTGRES_PASSWORD,
    'database': enviroment.parsed.POSTGRES_DB,
    logging: (...msg: any) => console.log(msg)
});

const modelDefiners = [
    require('./author.ts'),
    require('./book.ts'),
    require('./genre.ts'),
    require('./user.ts'),
    // Add more models here...
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, Sequelize.DataTypes);
}

const { Author, Book, Genre } = sequelize.models;

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });
Book.belongsToMany(Genre, { through: 'genres_books', as: 'genres', foreignKey: 'book_id' });
Genre.belongsToMany(Book, { through: 'genres_books', as: 'books', foreignKey: 'genre_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
