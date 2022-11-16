const express =require('express')
const { getAllAuthors, createAuthor, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/author')
const router = express.Router()

router.route('/').get(getAllAuthors).post(createAuthor)
router.route('/:id').get(getAuthor).patch(updateAuthor).delete(deleteAuthor)

module.exports = router