const {Author} = require('../models/model')



const getAuthorStatic = async (req,res)=>{
    // const allAuthors = await Author.find({},{_id:0}).populate('stories').select('title')

    //hide all IDs from showing
    const allAuthors = await Author.find({},{ __v:0}).populate('stories',{_id:0,author:0, __v:0})
    res.status(200).json({msg: 'Authors Static Page', nbHits:allAuthors.length, allAuthors: allAuthors})
}


const createAuthor = async (req, res)=>{
    //add the date the account was created. Update the schema for this
    const author = await Author.create(req.body)
    if (!author) {
        return res.status(404).json({msg: 'fill all requiredfields'})
    }
    res.status(201).json({status: 'success', data: author})
    
}

const getAllAuthors = async (req,res)=>{
    //who should have access to get all authors
    //ordinary users should be only allowed to see only few details about the authors. Use .select('')
    //admin users should be able to get more details about all users. Including the date the user registered, ...


    //create separate controllers for users and admin
    //check if the user is an admin or user then grant access acoordingly
    //User 
    const authors = await Author.find().populate('stories')
    res.status(200).json({msg: 'Authors Page', nbHits:authors.length, allAuthors: authors})
    
    //Admin
}


const getAuthor = async (req,res)=>{
    //is it a must to use name can't I use name?
    const {id:authorID} = req.params
    if (!authorID) {
        return res.status(404).json({success:false, msg: 'input author ID to search'})
    }

    const author = await Author.findOne({_id:authorID})
    if (!author) {
        return res.status(404).status({success:false, msg: `There is no author with ID: ${authorID}`})
    }

    res.status(200).json(({success:true, author}))
}


const updateAuthor = async (req,res)=>{
    const {id:authorID} = req.params
    console.log(authorID);
    if (!authorID) {
        return res.status(404).json({success:false, msg: 'input author ID to search'})
    }
    //if req.body is 
    // const author = await Author.findOneAndUpdate({_id:authorID},req.body,{new:true})
    const author = await Author.findByIdAndUpdate(authorID,req.body,{new:true})
    
    if (!author) {
        return res.status(404).status({success:false, msg: `There is no author with ID: ${authorID}`})
    }

    res.status(200).json(({success:true, author}))

}


const deleteAuthor = async (req,res)=>{
    const {id:authorID} = req.params
    console.log(authorID);

    if (!authorID) {
        return res.status(404).json({success:false, msg: 'input author ID to search'})
    }

    const author = await Author.findByIdAndDelete(authorID)

    if (!author) {
        return res.status(404).status({success:false, msg: `There is no author with ID: ${authorID}`})
    }

    res.status(200).json(({success:true, msg: 'Author deleted successfully'}))

}
module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorStatic

}
