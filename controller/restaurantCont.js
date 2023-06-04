const User = require('../model/userModel')
const Restaurant = require('../model/restaurantModel')
const Reviews = require('../model/reviewModel')

//This is for creating a Restaurant with name, address and total reviews
exports.listRestaurant = async(req, res)=> {
    const {name, address, description} = req.body


    console.log(name, address)
    try{
        const data = await Restaurant.create({
            name: name,
            address: address,
            description: description,
            totalReviews: 0
        })
    
        return res.status(201).json({message: 'created', success: true})
    }
    catch(err){
        console.log(err)
    }

}

// For getting all restaurants available for User
exports.getAllRestaurant = async(req,res)=> {
    try{
        let restaurants = await Restaurant.findAll()
        let allRestaurants = restaurants.sort((a,b)=> { // sorting done with name
            let fa = a.name.toLowerCase()
            let fb = b.name.toLowerCase()

            if(fa<fb){
                return -1
            }
            if(fa>fb){
                return 1
            }
            return 0
        })
        return res.status(200).json({data: allRestaurants, success: true})
    }
    catch(err){
        console.log(err)
    }
    
}

//Getting a Detail of a Restaurant

exports.getFullDetail = async(req,res)=> {
    try{
        let restoID = req.params.id

        let restoObj = await Restaurant.findByPk(restoID)

        return res.status(200).json({data: restoObj, success: true})
    }
    catch(err){
        console.log(err)
    }
    
}

// Admin Access request
exports.adminAccess= async(req,res)=> {
    try{
        const adminUser = await User.findByPk(req.user.id)
        console.log(adminUser)
        if(adminUser.isAdmin === true){
            const allRestaurantList =await Restaurant.findAll()
            console.log(allRestaurantList)
            return res.status(200).json({data:allRestaurantList, success: true})
        }
        else{
            return res.status(500).json({message: 'you are not authorized'})
        }
    }
    catch(err){
        console.log(err)
    }
    
}