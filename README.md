Старт: sh start.sh

-----------------------------------------------------

Постман коллекция: ./logru.postman_collection.json

swagger: http://localhost:3000/api

ЛОГИН ДЛЯ АДМИНА: admin
ПАРОЛЬ ДЛЯ АДМИНА: admin

АПИ для админа:

/admin/login [post]
/admin/users [post]
/admin/users [get]
/admin/users/:id [get]
/admin/users/:id [patch]
/admin/users/:id [delete]

АПИ для пользователя:

/login [post]
/registration [post]
/profile [get]
/profile [patch]
/go-to-bar-with-colleagues

АПИ для работы пользователя:

/profile/work [post]
/profile/work [get]
/profile/work [delete]
/profile/work [patch]


