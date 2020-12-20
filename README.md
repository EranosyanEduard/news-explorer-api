# Дипломный проект "News explorer", API.

______

## Краткое описание проекта

Дипломный проект "News explorer" является выпускной работой, в рамках которой
студент образовательного проекта
["Яндекс.Практикум"](https://praktikum.yandex.ru/) должен продемонстрировать
знания и навыки, полученные в результате прохождения курса, посвященного
изучению веб-разработки.

Текущий репозиторий содержит backend-часть такого проекта: API, позволяющий
осуществлять регистрацию и авторизацию пользователей, а авторизованным
пользователям - добавление, получение и удаление статей.

## Краткое описание API

В рамках данного раздела указаны характеристики запросов, позволяющих
взаимодейстовать с API: метод запроса, маршрут и данные, которые должен
содержать такой запрос.

- `POST /signup`, `req.body = { email, name, password }`
- `POST /signin`, `req.body = { email, password }`

*Примечание:* следующие маршруты защищены авторизацией.

- `GET /users/me`
- `GET /articles`
- `POST /articles`,
  `req.body = { date, image, keyword, link, source, text, title }`
- `DELETE /articles/{articleId}`, `req.params = { articleId }`

## Адрес API

Для взаимодействия с API воспользуйтесь одной из следующих ссылок:

- [http://api.news-explorer.ml](http://api.news-explorer.ml/)
- [http://www.api.news-explorer.ml](http://www.api.news-explorer.ml/)
- [https://api.news-explorer.ml](https://api.news-explorer.ml/)
- [https://www.api.news-explorer.ml](https://www.api.news-explorer.ml/)
