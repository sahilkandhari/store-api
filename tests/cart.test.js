const request = require('supertest')
const app = require('../src/app')
const { Cart } = require('../src/models/cart')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    cartOne,
    cartTwo,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)


test('Should create cart for user', async () => {
    const response = await request(app)
        .post('/api/users/me/cart')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            cartOne
        })
        .expect(201)
    const cart = await Cart.findById(response.body._id)
    expect(cart).not.toBeNull()   
})

test('Should fetch user cart', async () => {
     await request(app)
        .get('/api/users/me/cart')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get cart for unauthenticated user', async () => {
    await request(app)
        .get('/api/users/me/cart')
        .send()
        .expect(401)
})

test('Should delete cart for user', async () => {
    await request(app)
        .delete('/api/users/me/cart')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
    const cart = await Cart.findOne({"owner" : userTwoId})
    expect(cart).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/api/users/me/cart')
        .send()
        .expect(401)
})


test('Should update valid cart fields', async () => {
    const products = [
        {
            productId : 1,
            quantity : 5
        }
    ]    
    await request(app)
        .patch('/api/users/me/cart')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            products
        })
        .expect(200)
    const cart = await Cart.findOne({ "owner" : userTwoId}) 
    expect(cart.products.toObject()).toEqual(products)
})

test('Should not update invalid cart fields', async () => {
    await request(app)
        .patch('/api/users/me/cart')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            owner : 'acecava123312'
        })
        .expect(400)
})