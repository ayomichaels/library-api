const {Author, Story} = require('../models/model')

const createStory = async (req,res)=>{
    //users need to be registered before they can create a book
    //i can find the user by their username or ID
    //after creating book add the book to the author too
    const story = await Story.create(req.body)
    if (!story) {
        return res.status(404).json({msg: 'no user details inputed'})
    }
    const id = req.body.author;
    let author = await Author.findOne({_id:req.body.author})
    /// in the schema make stories and array.
    author.stories.push(story)
    const updatedAuthor = await Author.findByIdAndUpdate(id, author, {new : true} )

    
    res.status(201).json({status: 'success', data: story})
}


const getAllStories = async(req,res)=>{
    
    const stories = await Story.find({})
    res.status(200).json({msg: 'All stories', nbHits:stories.length, data: stories})
    // console.log(typeof(collectors));

}

const getStory = async (req,res)=>{
    const {id:bookID} = req.params
    const story = await Story.findOne({_id:bookID})
    if (!story) {
        return res.status(404).json({success:false, msg: 'Book ID is incorrect, input a valid book iD'})
    }

    res.status(200).json({success:true, story})
}


const updateBook = async (req,res)=>{
    
    //add authentication to ensure that only the author has update privileges
    
    const {id:bookID} = req.params
    if (!bookID) {
        return res.status(400).json({msg: 'input story ID'})
    }
    //first update the book, inout the author ID while updating the book if not the book will be assigned to the first entry on the Authors list
    // const story = await Story.findOneAndUpdate(bookID, req.body, {new:true})
    // //get the author of the book
    // const authorID = story.author

    // //get all details about the author
    // const author = await Author.findOne(authorID)
    // //add the updated story to the list of the author's stories
    // author.stories.push(story)
    // //update the authors details with the added stories
    // const updatedAuthorBooks = await Author.findOneAndUpdate(authorID, author,{new:true})

    const story = await Story.findByIdAndUpdate(bookID,req.body,{new:true})
    if (!story) {
        return res.status(404).json({msg:`No story found with ID: ${bookID}`})
    }
    
    res.status(200).json({success:'story updated successfully', story})
}


const deleteBook = async (req,res)=>{
    //add authentication to ensure that only the author has update privileges
    
    const {_id:bookID} = req.params
    if (!bookID) {
        return res.status(400).json({msg: 'input story ID'})
    }
    const story = await Story.findOneAndDelete(bookID)
    if (!story) {
        return res.status(404).json({msg:`No story found with ID: ${bookID}`})
    }
    
    res.status(200).json({success:'story deleted successfully'})
}
module.exports = {
    createStory,
    getAllStories,
    getStory,
    updateBook,
    deleteBook

}