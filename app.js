const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
//load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars
//add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', 
    extname: '.hbs' 
    })
);

app.set('view engine', '.hbs');


//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes

app.use('/', require('./routes/index'))


const PORT = process.env.PORT || 2121


app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))