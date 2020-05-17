const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require ('../src/models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne ={
    _id : userOneId,
   name : "Luka",
   address:{
        street:"Up street",
        city:"Pune"},
    orders : [
        {
            orderId : 211,
            date : 2-2-2020,
            status : "pending",
            items : []
        }
     ],
    email : "test1@test1.com",
    password : "Lukamadrid",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup new users', async () => {
    const response = await request(app).post('/api/users').send({
	    name : "Zach",
       address:{
            street:"Park street",
            city:"Mumbai"},
        orders : [
            {
                orderId : 101,
                date : "2020-02-01T18:30:00.000Z",
                status : "pending",
                items : []
            }
         ],
        email : "test2@test2.com",
        password : "ZachLavine8"
    }).expect(200)

     // Assert that the database was changed correctly
     const user = await User.findById(response.body.user._id)
     expect(user).not.toBeNull()
 
     // Assertions about the response
     expect(response.body).toMatchObject({
         user: {
             name: 'Zach',
             email: 'test2@test2.com',
             address:{
                street:"Park street",
                city:"Mumbai"},
            orders : [
                {
                    orderId : 101,
                    date : "2020-02-01T18:30:00.000Z",
                    status : "pending",
                    items : []
                }]
            },
         token: user.tokens[0].token
     })
     expect(user.password).not.toBe('ZachLavine8')

})

test('Should login existing user', async () => {
    await request(app).post('/api/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/api/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/api/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/api/users/me')
        .send()
        .expect(401)
})


test('Should update valid user fields', async () => {
    await request(app)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Luka Doncic'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Luka Doncic')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Delhi'
        })
        .expect(400)
})
