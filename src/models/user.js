const mongoose = require('mongoose')
const validator = require('validator')
const {Cart, cartSchema} = require('./cart')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    address : {
        street : {
            type : String
        },
        city : {
            type : String
        }
    },
    orders : [{
            _id : false,
            orderId : {
                type : Number
            },
            date : {
                type : Date
            },
            status : {
                type : String
            },
            items : [
                cartSchema
            ]
        
    }],
    email : {
        type: String,
        unique : true,
        required : true,
        trim :true,
        lowercase : true,
         validate(value) {
             if(!validator.isEmail(value)) {
                 throw new Error('Email is invalid')
             }
         }
    },
    password:{
        type:String,
        required : true,
        minlength : 7,
        trim : true,
         validate(value) {
             if(value.toLowerCase().includes('password')) {
                 throw new Error ('Password cannot contaon "password"')
             }
         }
      },
    tokens: [{
        token: {
          type : 'String',
          required : true
        }
      }]
},{
    timestamps : true
})


userSchema.virtual('cart', {
    ref : 'Cart',
    localField:"_id",
    foreignField : "owner"
  })


userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    
    next()
})

userSchema.pre('remove', async function(next) {
    const user = this
    await Cart.deleteOne({owner : user._id})
    next()
})


userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error ('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id : user._id.toString() },'storeapitoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    delete userObject.tokens
  
    return userObject
  }


const User = mongoose.model('User', userSchema)

module.exports =  User
