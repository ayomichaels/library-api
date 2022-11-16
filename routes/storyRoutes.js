const express =require('express')
const { getAllStories, createStory, updateBook, deleteBook, getStory } = require('../controllers/story')
const router = express.Router()

router.route('/').get(getAllStories).post(createStory)
router.route('/:id').patch(updateBook).delete(deleteBook).get(getStory)




module.exports = router