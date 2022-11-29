# money_way_be

## 1. Логин

http://localhost:5000/auth/login

### PARAMS:

`email` - String required

`password` - String required

### SUCCESS:

**200** :

```
{
    "message": "Пользователь успешно залогинился",
    "token": "............"
}
```

### ERROR CODE:

**400**

**403** - введён неверный email или пароль

---

## 2. Регистрация нового пользователя - доступно только админу

http://localhost:5000/admin/add

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### PARAMS:

`email` - String uniq required

`password` - String required - от 7 до 10 символов

`fullName` - String required

`registrationStartTime` - Number required

`registrationPeriod` - Number required

`payment` - Number required

`phone` - String required - значением поля может быть пустая строка

`comment` - String not required

### SUCCESS:

**200** :

```
{

    "message": "Пользователь успешно зарегистрирован"

}
```

### ERROR CODE:

**400**

---

## 3. Получение всех пользователей - доступно только админу

http://localhost:5000/admin/users

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### SUCCESS:

**200** :

```
{
    "message": "getAllUsers success",
    "users": [
        {
            "_id": "6384d9b2e0edb38c5211361f",
            "email": "1@mail.ru",
            "password": "$2a$07$KXzfEJBai1jAAN3aanV0mOO6OuvioliBaIrSau2ZuMe27avkkoHJ.",
            "fullName": " ",
            "registrationStartTime": 123,
            "registrationPeriod": 123,
            "payment": 123,
            "phone": "$2a$07$jPnH1fDKQPRQgT20rLgA4eGzHeuvK7P9tV7e6YVc8WN141rk2xaH2",
            "comment": "123",
            "roles": [
                "USER"
            ],
            "__v": 0
        },
        {
            "_id": "638508189129a6c5e8fee68e",
            "email": "2@mail.ru",
            "password": "$2a$07$zfBH7vT8.NhVFW3OiWtTjuhW/GGrXEi6TTMW1l.qfItGoIvutU1su",
            "fullName": " ",
            "registrationStartTime": 123,
            "registrationPeriod": 123,
            "payment": 123,
            "phone": "$2a$07$.JfBqp6xNCNSQbDXOr0eQ.YDm8su5o.q/5d4RC/QpFEe26B2myNUa",
            "comment": "123",
            "roles": [
                "USER"
            ],
            "__v": 0
        },
        {
            "_id": "6385f96954f87c21ed843096",
            "email": "admin@mail.ru",
            "password": "$2a$07$gujcsogLJ9U7WRULps2.4eziIBl67BovxwMTnj5MsMODQHP4D2do2",
            "fullName": "admin",
            "registrationStartTime": 0,
            "registrationPeriod": 0,
            "payment": 0,
            "phone": "$2a$07$7vsxL5318.hXoOBlaIC7Q.ql15/QU/yD7UbVOHyUMIShGkLU0rXGC",
            "comment": " ",
            "roles": [
                "ADMIN"
            ],
            "__v": 0
        }
    ]
}
```

### ERROR CODE:

**400**
**403**

---
