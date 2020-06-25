const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/api/users', async (req,res) => {
    //console.log(req)
    const user = new User(req.body)
  
    try{
    await user.save()

    const token = await user.generateAuthToken()
    res.send({user,token})

    }catch(e) {
        res.status(400).send(e)
        console.log(e)
    }
})

router.post('/api/users/login', async (req,res) => {
    //console.log(req)
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})

    }catch(e){
         res.status(400).send(e)
         console.log(e)
    }

})

router.post('/api/users/logout' ,auth , async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }catch (e) {
        res.status(500).send(e)
    }

})

router.post('/api/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e) {
        res.status(500).send(e)
    }

})

router.get('/api/users/me', auth , async (req,res) => {
    res.send(req.user)
})


router.patch('/api/users/me', auth, async(req,res) => {
    
    const allowedUpdates = ['name', 'email', 'password', 'address', 'orders']
    const updates = Object.keys(req.body)

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({"error" : "Invalid Operation"})
    }

    try {
       // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators : true})
       //Doing this here because middleware is overlooked by this function, no need in product router as no authetication is required there
       const user = await User.findById(req.user._id)

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
 
        await req.user.save()
        res.send(req.user)

    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/users/me', auth , async (req,res) => {
        
    try {
         await req.user.remove()

        res.send(req.user)
    }catch(e) {
        res.status(400).send(e)
    }
    
})


router.post('/api/users/me/orders', auth, async(req,res) => {
    
     try {   
       const newOrder = req.body.orders
       req.user.orders = req.user.orders.concat({...newOrder})
 
        await req.user.save()
        res.send(req.user)

    }catch(e) {
        res.status(400).send(e)
    }
})



module.exports = router