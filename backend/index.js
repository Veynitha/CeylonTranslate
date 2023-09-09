const express = require('express')
const cors = require('cors')
const {db} = require('./db/db')
const fileUpload = require('express-fileupload')
require('./services/pdf-reader')
require('dotenv').config()
const uploadRouter = require('./services/Img-2-Txt');

const app = express()

//------------MiddleWares------------//
app.use(express.json())
app.use(cors())

//file upload
app.use(fileUpload())

//route for Img-to-txt
app.use('/', uploadRouter);

const server = () => {
    db()
    app.listen(process.env.PORT, ()=> {
        console.log('listening to port ', process.env.PORT)
    }) 
}

server()