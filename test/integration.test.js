const request = require('supertest')
require('jest')


const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {Story, Author} = require('../models/model')
const app = require('../app')

jest.setTimeout(50000)
// beforeEach( async ()=>{
//     await mongoose.connect(process.env.MONGO_URI)
// })

// describe ("GET /all authors", () => {
//     it("should return a status of 200 if there's no error", async () => {
//         const response = await request(app).get("/author")
//         expect(response.status).toBe(200)

        
//     });

//     it ('should return the total number of authors', async ()=>{
//         const response = await request(app).get('/author')
//         expect(response.body.nbHits).toBe(6)
//     })

//     it ('should return a 404 if productID is invalid', async ()=>{
//         const productID = '5nfnfnje9'
//         const response = await request(app).get(`/author/${productID}`)
//         expect(response.status).toBe(404)
//     })
// });


describe ('POST/ author', ()=>{
    it ('creates a new author', async ()=>{
        const author = {
            "name": "Agbekoya Onireke",
            "username": "apena"
        }

        const response = await request(app).post('/author').send(author)

        expect(response.status).toBe(201)
    })
})


describe ('POST/ story', ()=>{
    it ('creates a new story', async ()=>{
        const authorID = '636e77db8760dbd1d9a7f25d'
        const story = {
            title: 'Always Do More Than Required',
            author: authorID
        }

        const response = await request(app).post('/story').send(story)

        expect(response.status).toBe(201)
    })
})


afterAll(()=>{
    mongoose.connection.close()
})