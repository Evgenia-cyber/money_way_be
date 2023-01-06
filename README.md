# money_way_be

**Ко всем запросам добавляем куки - в них находится refreshToken**

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
    "refreshToken": "..........",
    "roles": [ "ADMIN" ],
    "registrationEndTime": "2023-05-05"
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
    "refreshToken": "............",
    "roles": [ "ADMIN" ]
}
```

### ERROR CODE:

**400**
**401**
**404**

---

## 3. Регистрация нового клиента - доступно только админу

**POST**

http://localhost:5000/admin/add

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### PARAMS:

`email` - String uniq required

`password` - String required - от 7 до 10 символов

`fullName` - String required

`registrationStartTime` - String required

`registrationEndTime` - String required

`registrationPeriod` - Number required

`payment` - Number required

`comment` - String not required

### SUCCESS:

**200** :

```
{
    "message": "Новый клиент успешно добавлен",
}
```

### ERROR CODE:

**400**

---

## 4. Получение всех клиентов - доступно только админу

**GET**

http://localhost:5000/admin/users

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### SUCCESS:

**200** :

```
{
    "message": "Клиенты успешно получены",
    "users": [
        {
            "email": "111@mail.ru",
            "fullName": "Jen",
            "registrationStartTime": "2023-01-06",
            "registrationEndTime": "2023-04-06",
            "registrationPeriod": 3,
            "payment": 1000,
            "comment": "some comment",
            "__v": 0
        },
        {
            "email": "222@mail.ru",
            "fullName": "Jen",
            "registrationStartTime": "2023-02-05",
            "registrationEndTime": "2023-05-05",
            "registrationPeriod": 3,
            "payment": 1000,
            "comment": "",
            "__v": 0
        },
    ]
}
```

### ERROR CODE:

**400**
**403**

---

## 5. Редактирование информации о клиенте - доступно только админу

**PUT**

http://localhost:5000/admin/edit

### HEADERS:

**"Authorization"**: "Bearer ................" - token, полученный при логине

### PARAMS:

`_id` - String uniq required

`email` - String uniq required

`fullName` - String required

`registrationStartTime` - String required

`registrationEndTime` - String required

`registrationPeriod` - Number required

`payment` - Number required

`comment` - String not required

### SUCCESS:

**200** :

```
{

    "message": "Информация о клиенте успешно изменена"

}
```

### ERROR CODE:

**400**, **404**

---

## 6. Удаление клиента - доступно только админу

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

    "message": "Клиент успешно удалён"

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
