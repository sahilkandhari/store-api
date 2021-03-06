const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required: true
    },
    InStock : {
        type : Boolean,
        required: true
    },
    stock : {
        type : Number
    },
    category : {
        type : String,
        required: true
    }
},{
    timestamps : true
})


productSchema.virtual('cart', {
    ref : 'Cart',
    localField:"name",
    foreignField : "products.productName"
 })



const Product = mongoose.model('Product',productSchema)

module.exports = Product