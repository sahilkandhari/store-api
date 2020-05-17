const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    products : [{
        _id : false,
          productId : {
              type : mongoose.Schema.Types.Number,
              required : true,
              ref : 'Product'
          },
          quantity : {
              type : Number,
              required : true
          }
      
  }]
 
})


const Cart = mongoose.model('Cart',cartSchema)

module.exports = { Cart, cartSchema }