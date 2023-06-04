const User = require('../model/userModel')
const Restaurant = require('../model/restaurantModel')
const Review = require('../model/reviewModel')


//This is for posting Review and that includes which user has posted review and restaurant id for which review posted
exports.postReview = async(req,res)=> {
    try{
        const restoId = req.params.id
        const userId = req.user.id
        const {review} = req.body

        console.log('restoID>>>>>>>>>',restoId)
        console.log('review>>>>>>>>>>', review)

        const data = await Review.create({
            review: review,
            userId: userId,
            restaurantlistId: restoId
        })
        if(data){
            let totalReviews = Number(req.user.totalReviews)+1
            await User.update({totalReviews:totalReviews},{where:{id: userId}})
        }
        

        return res.status(201).json({data:data,success: true})
    }
    catch(err){
        console.log(err)
    }
    
}

//Getting All the reviews of the restaurant
exports.getAllReviews= async(req,res)=> {
    try{
        const allReview = await Review.findAll()

        return res.status(200).json({data: allReview, success: true})
    }
    catch(err){
        console.log(err)
    }
}