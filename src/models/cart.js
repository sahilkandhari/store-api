const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
        ref : 'User'
    },
    products : [{
        _id : false,
          productName : {
              type : mongoose.Schema.Types.String,
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