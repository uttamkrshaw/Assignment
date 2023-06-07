const express = require('express')
const userRouter = express.Router()
const {UserModel} = require('../Model/user.model')

userRouter.get("/get",async (req, res) => {
    try {
        const user = await UserModel.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.post("/add", async (req, res) => {
    try {
        const {fname, lname, mail, country, state, city, gender, dob, age } = req.body
        const user = new UserModel({ fname,lname, mail,country, state,city, gender, dob,age})
        await user.save()
        res.status(200).send("User Data Saved")
    } catch (error) {
        res.status(400).send(error.msg)
    }
})


module.exports = {
    userRouter
}
