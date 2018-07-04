"use strict";

const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcrypt')

module.exports = (knex) => {
  
  router.get("/:id", (res,req) => {
    //return user profile
    //
    console.log("APP GET")
  })


  // Base web page to login into the system. If the user is login send session to /urls
  router.get("/login", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: '/login'
      })
    } else {
      res.json({
        redirect: true,
        url: '/'
      })
    }
  });

  // Base web page to register a new user. If the user is login send the user to /urls.
  router.get("/register", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: '/register'
      })
    } else {
      res.json({
        redirect: true,
        url: '/'
      })
    }
  });

  // Get information from login web page
  router.post("/login", (req, res) => {
    knex.select('*')
    .from('users')
    .where('email', '=', req.body.email)
    .then(function(results) {
      if (bcrypt.compareSync(req.body.password, results[0].password)) {
        console.log('results is', results);
        req.session.user_id = results[0].id;
        res.json({
          redirect: true,
          url: '/'
        })
      } else {
        res.json({
          redirect: false,
          url: '/'
        })
      }
    })
    .catch(function(error) {
      console.error(error)
      res.json({
        redirect: false,
        url: '/'
      })
    });
  });

  // Get the information from web page register new user.
  router.post("/register", (req, res) => {
    knex.select('*')
    .from('users')
    .where('email', req.body.email)
    .then(function(results) {
      console.log(results);
      if (results.length != 0) { // test with user exist or not.
        res.json({
          redirect: false,
          url: '/',
          message: 'Error: The user exist!'
        })
      } else {
        knex('users')
          .returning('id')
          .insert([{
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
          }])
          .then(function(id) {
            req.session.user_id = id[0];
            console.log('req session after register', id);
            res.json({
              redirect: true,
              url: '/',
              message: 'User created'
            })
          })
          .catch(function(error) {
            console.error('Error: Inserting the user', error)
          });
      }
    })
    .catch(function(error) {
      console.error('Error: The user already have a user in the system', error)
    });
  });

  router.post("/changePassword", (req, res) => {
    knex.select('*')
      .from('users')
      .where('id', '=', req.session.user_id)
      .then(function(results) {
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          knex('users')
            .where('id', '=', req.session.user_id)
            .update({ password: bcrypt.hashSync(req.body.password, 15) })
        } else {
          res.json({
            redirect: false,
            url: '/'
          })
        }
      })
      .catch(function(error) {
        console.error('Error: The password doesnt match',error)
      });

    req.session = null;
  });

  router.post("/changePasswordEmail:email", (req, res) => {
    knex.select('*')
      .from('users')
      .where('email', '=', req.session.email)
      .then(function(results) {
        if (results) {
          knex('users')
            .where('email', '=', req.session.email)
            .update({ password: bcrypt.hashSync(req.body.password, 15) })
        } else {
          res.json({
            redirect: true,
            url: '/'
          })
        }
      })
      .catch(function(error) {
        console.error('Error: The password doesnt match',error)
      });

    req.session = null;
  });

  // Get the information when the user clicked in logout button and turn the session to null and redirect the user to /urls.
  router.post("/logout", (req, res) => {
    req.session = null;
    res.json({
      redirect: true,
      url: '/'
    })
  });

  return router;
}