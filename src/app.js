const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)


module.exports = app