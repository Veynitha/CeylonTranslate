const express = require('express')
const cors = require('cors')
const {db} = require('./db/db')
const routes = require('./routes/routes')
require('dotenv').config()
// require('./services/text_to_speech-api')
const app = express()

const corsOptions = {
    credentials: true
}

//------------MiddleWares------------//
app.use(express.json())
app.use(cors(corsOptions))

app.use(routes)


const server = () => {
    db()
    app.listen(process.env.PORT, ()=> {
        console.log('listening to port ', process.env.PORT)
    }) 
}

server()