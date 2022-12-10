# money_way_be

## 1. Логин

**POST**

http://localhost:5000/auth/login

### PARAMS:

`email` - String required

`password` - String required

### SUCCESS:

**200** :

```
{
    "message": "Пользователь успешно залогинился",
    "accessToken": "..........",
    "refreshToken": ".........."
}
```

```
refreshToken добавляется в cookie
```

### ERROR CODE:

**400**

**403** - введён неверный email или пароль

---

## 2. Обновление токенов

**GET**

http://localhost:5000/auth/refresh

### SUCCESS:

**200** :

```
{
    "message": "Токены успешно обновлены",
    "accessToken": "............",
    "refreshToken": "............"
}
```

### ERROR CODE:

**400**
**401**
**404**

---

## 3. Регистрация нового пользователя - доступно только админу

**POST**

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
    "message": "Пользователь успешно зарегистрирован",
    "accessToken": "..........",
    "refreshToken": ".........."
}
```

```
refreshToken добавляется в cookie
```

### ERROR CODE:

**400**

---

## 4. Получение всех пользователей - доступно только админу

**GET**

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

## 5. Редактирование информации о пользователе - доступно только админу

**PUT**

http://localhost:5000/admin/edit

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### PARAMS:

`_id` - String uniq required

`email` - String uniq required

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

    "message": "Информация о пользователе успешно изменена"

}
```

### ERROR CODE:

**400**, **404**

---

## 6. Удаление пользователя - доступно только админу

**DELETE**

http://localhost:5000/admin/delete

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### PARAMS:

`_id` - String uniq required

### SUCCESS:

**200** :

```
{

    "message": "Пользователь успешно удалён"

}
```

### ERROR CODE:

**400**, **404**

---

## 7. Сохранение ролей

**POST**

http://localhost:5000/admin/roles

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### SUCCESS:

**200** :

```
{
    "message": "Роли успешно сохранены"
}
```

### ERROR CODE:

**400**

---
