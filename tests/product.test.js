const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const Product = require ('../src/models/product')

productOne = {
    _id : 1,
    name :"Spinach",
    price : 4,
    InStock : true,
    stock : 50,
    marker: "veg"
}

beforeEach(async () => {
    await Product.deleteMany()
    await new Product(productOne).save()
})


test('Should create new product', async () => {
    const response = await request(app).post('/api/products').send({
        _id : 2,
        name : "Tomato",
        price : 4,
        InStock : true,
        stock : 50,
        marker: "veg"
    }).expect(200)

     // Assert that the database was changed correctly
     const product = await Product.findById(response.body._id)
     expect(product).not.toBeNull()
 
     // Assertions about the response
     expect(response.body).toMatchObject({
        _id : 2,
        name : "Tomato",
        price : 4,
        InStock : true,
        stock : 50,
        marker: "veg"
     })
    
})

test('Should get all products', async () => {
    await request(app)
        .get('/api/products')
        .send()
        .expect(200)
})

test('Should get products by name', async () => {
    await request(app)
        .get('/api/products/:name')
        .send()
        .expect(200)
})

test('Should get products by category', async () => {
    await request(app)
        .get('/api/products/:marker')
        .send()
        .expect(200)
})

test('Should delete product', async () => {
    await request(app)
        .delete(`/api/products/${productOne.name}`)
        .send()
        .expect(200)
    const product = await Product.findById(productOne._id)
    expect(product).toBeNull()
})

test('Should update valid product fields', async () => {
    await request(app)
        .patch('/api/products/:name')
        .send({
            name: 'Carrot'
        })
        .expect(200)
    const product = await Product.findById(productOne._id)
    expect(product.name).toEqual('Carrot')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/api/products/:name')
        .send({
            marker: 'Non-veg'
        })
        .expect(400)
})