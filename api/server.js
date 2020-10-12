const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require("connect-session-knex")(session); // for saving sessions to database

const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const protected = require('../auth/protected-mw');
const connection = require('../database/db-config');

const server = express();

const sessionConfiguration = {
    name: 'Sugar', // defaults to sid for the cookie name
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    cookie: {
      httpOnly: true, // true means JS can't access the cookie data
      maxAge: 1000 * 60 * 10, // expires after 10 mins
      secure: process.env.SECURE_COOKIES || false, // true means send cookies over https only
    },
    resave: false, // re-save the session information even if there are no changes
    saveUninitialized: true, // read about GDPR compliance. if you don't have a session, is it okay to send the user cookies
    store: new KnexSessionStore({
      knex: connection, // connection to the database
      tablename: "sessions",
      sidfieldname: "sid", // name of session id column
      createtable: true, // if the table doesn't exist, create it
      clearInterval: 1000 * 60 * 60, // remove expired sessions from the database every hour
    }),
  };

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfiguration));

server.use('/api/auth', authRouter);
server.use('/api/users', protected, usersRouter);

server.get('/', (req, res) => {
    res.json({ 
        api: "running",
        session: req.session
    })
});

module.exports = server;