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
            "email": "1@mail.ru",
            "fullName": " ",
            "registrationStartTime": 123,
            "registrationPeriod": 123,
            "payment": 123,
            "phone": "123",
            "comment": "123",
            "__v": 0
        },
        {
            "email": "2@mail.ru",
            "fullName": " ",
            "registrationStartTime": 123,
            "registrationPeriod": 123,
            "payment": 123,
            "phone": "123",
            "comment": "123",
            "__v": 0
        },
        {
            "email": "7@mail.ru",
            "fullName": "admin",
            "registrationStartTime": 0,
            "registrationPeriod": 0,
            "payment": 0,
            "phone": "123",
            "comment": " ",
            "__v": 0
        }
    ]
}
```

### ERROR CODE:

**400**
**403**

---
