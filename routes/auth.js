const express = require('express')
const passport = require('passport')
const router = express.Router()

//@desc Auth with google
//@route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//@desc Auth with callback
//@route GET /auth/google
router.get('/google/callback', passport.authenticate('google', 
{ failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

//@desc Logout User
//@route /auth/logout
//CHanged from traversy, passport 0.6 require logout to be async
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if(err) {return next(err)}
        res.redirect('/')
    })
})

module.exports= router