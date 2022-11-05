# Домашка 5 #

## Задание ##
Нужно создать приложение на Vue или использовать уже имеющееся
Подключить к нему Typescript и далее все компоненты писать уже на tsx
Реализовать формы регистрации и логина по паролю
Создать страницу со списком чатов и возможность создания чата (с указанием его названия)
Реализовать пагинацию для списка чатов

Дизайн: сделайте красивенько

Дополнительно:
Реализовать oauth через yandex. Перенаправление на урл такого вида:
https://oauth.yandex.ru/authorize
?response_type=code
&client_id={получить с бэкенда}
&redirect_uri=http://localhost:5000/ ||  http://localhost:3000/

И еще небольшая допка:
Реализовать пагинацию через роутинг по аналогии с тем, как мы делали на воркшопе
Решили, что апишку генерировать не нужно, так как более подробно это будет разбираться на следующей неделе.
Сваггер (сам бэкенд на том же хосте и порту): http://62.113.98.233:5000/api/v2/swagger/

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
