# Привет!

## Как завести?

1. Раздобыть .env
2. Провести миграции
3. `npm run dev` / `npm run start`

Схема БД (чуть устарела):
https://dbdiagram.io/d/65ce4461ac844320ae3cdf1c

Задание:
https://docs.google.com/document/d/1HDZ3aWvZ1rBeQjUfNdSwveo-EUl-YatWLC8jGha_jgA/edit?pli=1

Актуальную постман - коллекцию смотри в docs.

Код, с которого смотрел как вообще работать с sequelize, express и ноде - https://github.com/sequelize/express-example/blob/master/express-main-example/sequelize/index.js

## Todo 
1. Добавить пользователям задачи на день
2. Провести валидацию на модели, см. class-validate
3. Вынести повторяющееся участики кода по DRY. Сомневаюсь, что обращение к бд должно лежать в роутах.
