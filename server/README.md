# Getting Started with node server App

## Installation

Enter to the server folder

```bash
cd server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be cyan with the message:

`server run on: http://localhost:8181/`

And if there are no login errors you should see the message painted in cyan:

`connected to MongoDb!`

## User Types

### Admin Users

- Admin users have full control over the system.
- They can perform view all details of users, delete users and cards, and change card numbers.
- you cannot register as an admin user, please contact the system if you want to be an admin.

### Regular Users

- Regular users can only favorite cards.
- They cannot create or update cards.
- To create a regular user, set the isBiz property to "false" during registration.

### Available Routes

### User- the workers in the office:

#### Register a new user

POST /http://localhost:8181/api/auth/users

- must provide token
  \*\* must be registered as admin

#### Login a user

POST /http://localhost:8181/api/auth/users/login

#### Get all users

GET /http://localhost:8181/api/auth/users

- must provide token
  \*\* must be registered

#### For Information about a user

GET /http://localhost:8181/api/auth/users/:id

request:

- must provide token
  \*\* must be registered either an admin, or the user himself.

#### For User information update/edit

PUT /http://localhost:8181/api/auth/users/:id

- must provide token
  \*\* must be the registered user

#### Change isBusiness status

PATCH /http://localhost:8181/api/auth/users/:id

- must provide token
  \*\* must be the registered user

#### Delete user

DELETE /http://localhost:8181/api/auth/users/:id

- must provide token
  \*\* must be the user who wants to be deleted or to be Admin.

#### Get details about the provide token

GET /http://localhost:8181/api/auth/users/userInfo/:id

- must provide token

#### Get the tasks of the user

GET /http://localhost:8181/api/auth/users/usercard/:id

- must provide token

### Cards:

#### To receive all business cards

GET /http://localhost:8181/api/cards

- must provide token

#### To receive all business cards the user created.

GET /http://localhost:8181/api/cards/my-cards

- must provide token
  You will need to provide a token to get an answer from this api

#### To create a new card

POST ///http://localhost:8181/api/cards/createCustomer

-Must provide token.

#### To get a business card of a specific business

GET/ http://localhost:8181/api/cards/:id

- must provide token
  id of the card is required

#### To create a new business card

POST /http://localhost:8181/api/cards

request:

- must provide token

#### To get the favorited business cards of a user

Get /http://localhost:8181/api/cards/fav-cards

request:

- must provide token

#### To update a business card

PUT/ http://localhost:8181/api/cards/:id

request:

- must provide token
  \*\* must be the registered user who created the card.

#### to edit bizNumber

PUT/ http://localhost:8181/api/biznum/:id
request:

- must provide token
  \*\* must be Admin.

#### To update card like

PATCH http://localhost:8181/api/cards/:id

- must provide token
  \*\* must be a registered user.

#### To delete a business card

DELETE / http://localhost:8181/api/cards/:id

- must provide token
  \*\* must registered the use who created the card or admin user

### Tasks:

#### Get all tasks

GET http://localhost:8181/api/cards/tasks

- must provide token

#### Create new Task

POST //http://localhost:8181/api/cards/tasks/:id

-must provide token.

#### Get worker tasks

GET //http://localhost:8181/api/cards/tasks/:id

-must provide token.

#### Finish task

PUT //http://localhost:8181/api/cards/tasks/toupdate/:id

-must provide token

#### Get the tasks of the worker logged in

GET /http://localhost:8181/api/cards/tasks/getmytasks/:id

- must provide token.

#### Get worker's done tasks

GET /http://localhost:8181/api/cards/tasks/getmydonetasks/:id

- must provide token.
