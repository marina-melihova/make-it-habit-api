### Heroku host: [https://api-habit.herokuapp.com/](https://api-habit.herokuapp.com/)

# Auth
### Login
* URN: /auth/login
* METHOD: POST
* BODY: 
```json
Request:
{
  "email": "naydyonovdanil@gmail.com",
  "password": "Qwerty123"
}

Response: status 200
{
  "access_token": <JWT token>
}
```
### Registration
* URN: /auth/registration
* METHOD: POST
* BODY: 
```json
Request:
{
  "name": "Danil",
  "email": "naydyonovdanil@gmail.com",
  "password": "Qwerty123"
}
Response: status 201
```
