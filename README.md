<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

**Module showing the interaction of several
passport authorization strategies**

## business logic of the module
1. Depending on the chosen strategy, the user is redirected to the service from where access to mail is requested
    - If the requested mail is not in the database, then a 401 status code are returned and interceptors are triggered, which redirect the user to the registration endpoint
    - If the user is found, an access token is generated
 <p align="center">
  <img width="800" height="350" src="https://github.com/Lomtiqkqkq/Auth-passport/blob/main/src/image/access%20token%20return.png" alt="return access_token">
</p>

**IMPORTANT! In this module, the logic for generating/updating the refresh token is not thought out, which makes it more vulnerable, this logic will be added in subsequent updates**

## Used Strategies

```bash
#passport-local
$ npm install passport-local

#passport-jwt
$ npm install passport-jwt
$ npm install @types/passport-jwt -D

#passport-google
$ npm install passport-google-oauth20
$ npm install @types/passport-google-oauth20

#passport-yandex
$ npm install passport-yandex
## there are no typescript types for Yandex
```
**You can familiarize yourself with the principles
of operation of a passport in their [official documentation](https://www.passportjs.org/)**

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```




## Support

For all questions, you can write personally using the links below.

## Me

- Author - [Lomti_qk](https://github.com/Lomtiqkqkq)
- Telegram - [@DeVlmN](https://t.me/DeVlmN)


