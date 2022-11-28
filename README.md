# money_way_be

http://localhost:5000/auth/registration

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

**200** : `{ "message": "Пользователь успешно зарегистрирован" }`

### ERROR CODE:

**400** 

---

http://localhost:5000/auth/login

### PARAMS:

`email` - String required

`password` - String required

### SUCCESS:

**200** : `{ "message": "Пользователь успешно залогинился" }`

### ERROR CODE:

**400** 

**403**  - введён неверный email или пароль

---