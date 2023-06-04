const userAuthentication = require('../middleware/auth')

const express = require('express')

const reviewController = require('../controller/reviewCont')
const router = express.Router()

router.post('/full-detail/:id', userAuthentication.authenticate, reviewController.postReview)
router.get('/get-all-reviews', userAuthentication.authenticate, reviewController.getAllReviews)

module.exports = router