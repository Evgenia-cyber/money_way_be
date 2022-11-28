# money_way_be

http://localhost:5000/auth/registration

### PARAMS:

`email` - String uniq required

`password` - String required

`fullName` - String required

`registrationStartTime` - Number required

`registrationPeriod` - Number required

`payment` - Number required

`phone` - String required

`comment` - String

### SUCCESS:

**200** : `{ "message": "Пользователь успешно зарегистрирован" }`

### ERROR:

**400** : `{ "message": "Пользователь с таким email и/или номером телефона уже существует" }`

**400** : `{ "message": "Registration error: Error: Illegal arguments: undefined, string" }`

---
