require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const {connection} = require('./Connection/connection')
const {userRouter} = require('./Router/user.routes')
app.use(cors())
app.use(express.json())

app.use('/user',userRouter)

app.get('/', (req, res) => {
    res.send('<h1>Welcome To Assignment Backend</h1>')
})

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('Server is Running at 4500 ');
    } catch (error) {
        console.log(error);
    }
})
