### Heroku host: [https://api-habit.herokuapp.com/](https://api-habit.herokuapp.com/)

# Auth
### Login
* URN: /auth/login
* METHOD: POST
```json
BODY

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
```json
BODY

Request:
{
  "name": "Danil",
  "email": "naydyonovdanil@gmail.com",
  "password": "Qwerty123"
}

Response: status 201
```
### Re-send to email verify link
* URN: /auth/sendVerify
* METHOD: POST
```json
BODY

Request:
{
  "email": "naydyonovdanil@gmail.com",
}

Response: status 200
```
### Get own habits
* URN: /habits
* METHOD: GET
```json
HEADER

Authorization: <Your JWT token>
```
### Create habit
* URN: /habits
* METHOD: POST
```json
HEADER

Authorization: <Your JWT token>
```
```json
BODY

Request:
{
  "name": "My Habit"
}

Response: 
{
  "createAt": "2020-09-01T01:07:23.330Z",
  "data": [null, null, null ...],
  "efficiency": 0,
  "_id": "5f4d9edf6375b430bda8ce92",
  "name": "My Habit"
}
```
### Delete habit
* URN: /habits/:habitId
* METHOD: DELETE
* 
```json
HEADER

Authorization: <Your JWT token>
```
```json
Response: status 200
```
### Update habit
* URN: /habits
* METHOD: PATCH
```json
HEADER

Authorization: <Your JWT token>
```
```json
BODY

Request:
{
  "id": "5f4d9edf6375b430bda8ce92",
  "name": "New name of habit",
  "data": [false, true, false, true, null, null ....]
}

Response: status 200
{
  "createAt": "2020-09-01T01:07:23.330Z",
  "data": [false, true, false, true, null, null ....],
  "efficiency": 0,
  "_id": "5f4d9edf6375b430bda8ce92",
  "name": "New name of habit"
}
```
