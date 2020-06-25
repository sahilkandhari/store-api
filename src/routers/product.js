const express = require('express')
const Product = require('../models/product')
const router = new express.Router()


router.post('/api/products', async (req,res) => {
    const product = new Product(req.body)
  
    try{
    await product.save()
    res.status(200).send(product)
    }catch(e) {
        res.status(400).send()
    }
})


router.get('/api/products', async (req,res) => {
    const products = await Product.find({})
    
    try {
        res.status(200).send(products)
    }catch(e) {
        res.send(500).send()
    }
})


router.get('/api/products/:name', async (req,res) => {
    const name = req.params.name.toString()
    const product = await Product.find({"name" : name})
    
    if(!product) {
        return res.status(404).send()
    }
    
    try {
        res.send(product)
    }catch(e) {
        res.send(404).send()
    }

})


router.get('/api/products/:marker', async (req,res) => {
    const marker = req.params.marker.toString()
    const product = await Product.find({"marker" : marker})

    if(!product) {
        return res.status(404).send()
    }
    
    try {
        res.send(product)
    }catch(e) {
        res.send(404).send()
    }

})


router.patch('/api/products/:name', async(req,res) => {
    
    const name = req.params.name.toString()
    const allowedUpdates = ['name', 'price', 'InStock', 'stock']
    const updates = Object.keys(req.body)
    

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({"error" : "Invalid Operation"})
    }

    try {       
        const filter = {name: name}
        const product = await Product.findOneAndUpdate(filter , req.body , { new : true})

         console.log(product)
         await product.save()
         res.send(product)

    }catch(e) {
        res.status(400).send()
    }
})

router.delete('/api/products/:name', async (req,res) => {
    const name = req.params.name.toString()

    try {
        const product = await Product.findOne({ name })      
        if (!product) {
            return res.status(404).send()
        }
        await product.remove()
        res.send(product)
    }catch(e) {
        res.status(400).send()
    }
    
})



module.exports = router