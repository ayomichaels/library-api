const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: [true, 'username already taken']
    },
    stories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Story'
    }
})

const storySchema = new mongoose.Schema({
    title: String,
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
})

// const librarySchema = new mongoose.Schema({
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Author'
//     }
// })

const Author = mongoose.model('Author', authorSchema)
const Story = mongoose.model('Story', storySchema)

module.exports = {Author, Story}