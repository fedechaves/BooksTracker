const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')


//load config
dotenv.config({ path: './config/config.env' })

//passport config 
require('./config/passport')(passport)

connectDB()

const app = express()

//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars /added the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', 
    extname: '.hbs' 
    })
);

app.set('view engine', '.hbs');

// Sessions 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    })
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 2121


app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))