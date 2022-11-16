const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const {Author, Story} = require('./models/model')
const authorRoutes = require('./routes/authorRoutes')
const storyRoutes = require('./routes/storyRoutes')
const {getAuthorStatic} = require('./controllers/author')

app.use(express.json())
//routes

app.get('/static', getAuthorStatic)
app.use('/author', authorRoutes)
app.use('/story', storyRoutes)
app.use('*', (req,res)=>{
    res.status(404).json({msg:'page not found'})
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, ()=>{
    console.log('database connected succesfully');
})



app.listen(3545, ()=>{
    console.log(`Server listeming on port: 3545`);
})

module.exports = app