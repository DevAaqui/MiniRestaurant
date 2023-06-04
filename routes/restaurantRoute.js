const userAuthentication = require('../middleware/auth')

const express = require('express')

const restaurantController = require('../controller/restaurantCont')

const router = express.Router()

router.post('/listing-restaurant', userAuthentication.authenticate, restaurantController.listRestaurant)
router.get('/all-restaurants', userAuthentication.authenticate, restaurantController.getAllRestaurant)
router.get('/full-detail/:id', userAuthentication.authenticate, restaurantController.getFullDetail)
router.get('/full-access-admin', userAuthentication.authenticate, restaurantController.adminAccess)

module.exports = router