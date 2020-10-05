# Topik ExpressJS
A backend for Discash API. It's built on the Node Js, uses Mysql & Express.
## Instalation
1. clone this repo
```
git clone https://github.com/fajarpng/topik_app_ExpressJS.git
```
2. open app directory in terminal
3. type
```
npm install
```
3. create databse topik_app
## Features
* Topic management
* Comment management
* User managemet
* JWT token
* Upload image
## Usage
Setting your dotenv file
```
APP_PORT=
APP_URL=

DB_HOST=
DB_USER=
DB_PASS= 
DB_NAME=topik_app
```
run the server
```
nodemon
```
# JSON Response
```
{
    "status": false,
    "message": "page not found",
    "result": [],
}
```
## End Point
### TOPIC
* **GET** all topic endpoint path: /topics
* **GET** topic by id endpoint path: /topics/:id
* **POST** create topic endpoint path: /topics
* **PATCH** edit by id endpoint path: /topics/:id
* **DELETE** dalate by id endpoint path: /topics/:id
### USER
* **POST** login endpoint path: /users/login
* **POST** register endpoint path: /users
* **PATCH** edit user endpoint path: /users/:id
* **PATCH** edit avatar endpoint path: /users/avatar/:id
### COMMENT
* **GET** all comment by topic endpoint path: /comment?topik_id={id}
* **GET** comment by id endpoint path: /comment/:id
* **POST** create comment endpoint path: /comment
* **PATCH** edit by id endpoint path: /comment/:id
* **DELETE** dalate by id endpoint path: /comment/:id
