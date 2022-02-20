# Simple Image processing API

## Second assignment in Advanced web development course in Udacity powered by FWD

this is a simple API for store using:

- Express for the webserver
- JWT for authentication
- bcrypt for hashing
- Jasmine and supertest for testing

## Installation

in order to test this application you have to follow these steps:

### database setup

1. install postgres database

2. create two databases one for dev and another one for test

```sh
    CREATE database database_name
```

3. create new user and grant to him all privileges

```sh
    create user user_name with encrypted password 'mypassword';
```

```sh
    grant all privileges on database database_name to user_name;
```

4. database runs on the default port 5432

### application setup

1. clone the project

```sh
git clone https://github.com/AbdulrhmanSobhyAlsayed/storefront-udacity.git
```

2. move to the folder

3. create .env file with these variables

```sh
ENV=current_env
POSTGRES_HOST=the host
POSTGRES_DB=database_name
POSTGRES_TEST_DB= database_test_name
POSTGRES_USER=database_user
POSTGRES_PASSWORD=duser_password
BCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SECRET
```

4. update database.json file with database information

5. Install the dependencies and devDependencies and start the server.

```sh
npm install
```

6. run the migration

```sh
npm run migrate:up
```

7. run the server (the application will runs on port 3000 by default)

```sh
npm run start
```

8. to build the project

```sh
npm run build
```

and the built project will be in dist folder

9. to run test of the project

```sh
npm run test
```
