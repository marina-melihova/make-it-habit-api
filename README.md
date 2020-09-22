### Heroku host: [https://make-it-habit-api.herokuapp.com](https://make-it-habit-api.herokuapp.com)

# Auth
### Login
* URN: /auth/login
* METHOD: POST
```json
BODY

Request:
{
  "email": "example@mail.com",
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
  "email": "example@mail.com",
  "password": "Qwerty123"
}

Response: status 201
```
### Update password
* URN: /auth/updatePassword
* METHOD: POST
```json
HEADER

Authorization: <Your JWT token>

BODY

Request:
{
  "password": "NewPassword123",
  "confirmPassword": "NewPassword123"
}

Response: status 200
```

### Get own habits
* URN: /habits
* METHOD: GET
```json
HEADER

Authorization: <Your JWT token>

BODY

Response:
{
    "user": {
        "firstName": "",
        "lastName": "",
        "email": "example@mail.com",
        "registerData": "2020-09-14T05:46:58.868Z",
        "avatar": "",
        "phone": "",
        "id": "5f5f03d669d30e3682d30e8f"
    },
    "habits": [
        {
            "createAt": "2020-09-14T06:15:57.588Z",
            "data": [ null, null ...],
            "efficiency": 0,
            "planningTime": "asdas",
            "iteration": "asdasdasd",
            "_id": "5f5f0aa3db78623b53c0c60a",
            "name": "qwe"
        }
    ]
}
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
, "planningTime": "plan time",
  "iteration": "Some iteration"
}

Response: 
{
  "createAt": "2020-09-01T01:07:23.330Z",
  "data": [null, null, null ...],
  "efficiency": 0,
  "_id": "5f4d9edf6375b430bda8ce92",
  "name": "My Habit",
  "planningTime": "plan time",
  "iteration": "Some iteration"
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
  "name": "New name of habit",
  "planningTime": "plan time",
  "iteration": "Some iteration"
}
```

### Update Quize Info
* URN: /users/updateQuizInfo
* METHOD: POST
```json
HEADER

Authorization: <Your JWT token>
```
```json
BODY

Request:
{
  "smokeYears": 1,
  "cigarettePerDay": 2,
  "cigarettePerTime": 3,
  "cigarettePackPrice": 5
}

Response: status 200
{
  "smokeYears": 1,
  "cigarettePerDay": 2,
  "cigarettePerTime": 3,
  "cigarettePackPrice": 5
}
```

### Update Cigarettes Info
* URN: /users/updateCigarettes
* METHOD: POST
```json
HEADER

Authorization: <Your JWT token>
```
```json
BODY

Request:
{
   "startedAt": "2020-09-14T09:11:03.448Z",
   "data": [ 12,null ...]
}

Response: status 200
{
   "startedAt": "2020-09-14T09:11:03.448Z",
   "data": [ 12,null ...]
}
```

### Add payment card
* URN: /users/addPayment
* METHOD: POST
```json
HEADER

Authorization: <Your JWT token>
```
```json
BODY

Request:
{
   "number": "4549568721099231",
   "timeExpiration": "02/22"
}

Response: status 200
```

### Add payment card
* URN: /users/updateSubscription
* METHOD: POST
```json
HEADER

Authorization: <Your JWT token>
```
```json
BODY

Request:
{
   "plan": "name of plan",
}

Response: status 200
```

