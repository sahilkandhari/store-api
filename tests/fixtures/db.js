const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const { Cart } = require('../../src/models/cart')


const userOneId = new mongoose.Types.ObjectId()
const userOne ={
    _id : userOneId,
   name : "Luka",
   address:{
        street:"Up street",
        city:"Pune"},
    orders : [
        {
            orderId : 211,
            date : 2-2-2020,
            status : "pending",
            items : []
        }
     ],
    email : "test1@test1.com",
    password : "Lukamadrid",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


const userTwoId = new mongoose.Types.ObjectId()
const userTwo ={
    _id : userTwoId,
   name : "Zach",
   address:{
        street:"Park street",
        city:"Mumbai"},
    orders : [
        {
            orderId : 101,
            date : 2-2-2020,
            status : "pending",
            items : []
        }
     ],
    email : "test2@test2.com",
    password : "ZachLavine8",
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}


const cartOne = {
    _id: new mongoose.Types.ObjectId(),
    owner: userOne._id,
    products : [
        {
            productId : 1,
            quantity : 5
        }
    ]
}


const cartTwo = {
    _id: new mongoose.Types.ObjectId(),
    owner: userTwo._id,
    products : [
        {
            productId : 2,
            quantity : 5
        }
    ]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Cart.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
  //  await new Cart(cartOne).save()
    await new Cart(cartTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    cartOne,
    cartTwo,
    setupDatabase
}