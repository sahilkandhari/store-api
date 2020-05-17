const express = require('express')
const { Cart } = require('../models/cart')
const auth = require('../middleware/auth')
const router = new express.Router()


router.get('/api/users/me/cart', auth, async (req,res) => {
   
    const cart = await Cart.findOne({owner : req.user._id})

    if(!cart) { 
        return res.status(404).send()
    }

    try{
        res.status(200).send(cart)
    }catch(e) {
        res.status(500).send()
    }

})

router.post('/api/users/me/cart', auth, async (req,res) => {
   
    const cart = new Cart({
        ...req.body,
        owner : req.user._id
    })

      try{
        const count = await Cart.find({owner : req.user._id})
        
        if(count.length >= 1) {
            return res.status(400).send({"error" : "Cart already exists"})
        }
        
        await cart.save()
        res.status(201).send(cart)
    }catch(e) { 
        res.status(400).send()
      }

})

router.patch('/api/users/me/cart', auth, async(req,res) => {
    
    const allowedUpdates = ['products']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({"error" : "Invalid Operation"})
    }

    try {

        const cart = await Cart.findOne({owner : req.user._id})
    
        if(!cart) {
            return res.status(404).send()
        }
        
        updates.forEach((update) => {
            cart[update] = req.body[update]
        })
 
        await cart.save()
        res.send(cart)

    }catch(e) {
        res.status(400).send()
    }
})


router.delete('/api/users/me/cart', auth, async (req,res) => {
    try {
        const cart = await Cart.findOne({owner : req.user._id})
        await cart.remove()

       res.status(200).send(cart)
   }catch(e) {
       res.status(400).send()
   }
})


module.exports = router