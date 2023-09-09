const express = require('express')
require('dotenv').config()

const cors = require('cors')
const {db} = require('./db/db')
const fileUpload = require('express-fileupload')
//require('./services/pdf-reader')

require('../backend/services/translate-api')

const app = express()

//------------MiddleWares------------//
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(cors())

//file upload
//app.use(fileUpload())

//translater history
app.use("/api/translaterhistory", require("./routes/translaterHistoryRoutes"));


const server = () => {
    db()
    app.listen(process.env.PORT, ()=> {
        console.log('listening to port ', process.env.PORT)
    }) 
}

server()