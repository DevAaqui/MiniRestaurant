const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

var cors = require('cors')

const app = express()
dotenv.config({ path: './.env'});

const User = require('./model/userModel')
const Restaurant = require('./model/restaurantModel')
const Reviews = require('./model/reviewModel')


const bodyParser = require('body-parser')

const sequelize = require('./util/database')

app.use(cors({
    origin: '*'
}));

const userRoutes = require('./routes/userRoute')
const restaurantRoute = require('./routes/restaurantRoute')
const reviewRoute = require('./routes/reviewsRoute')

app.use(bodyParser.json({extended: false}))

app.use(userRoutes)
app.use(restaurantRoute)
app.use(reviewRoute)

// Establishing Relationships among Models
User.hasMany(Reviews)
Reviews.belongsTo(User)
Restaurant.hasMany(Reviews)
Reviews.belongsTo(Restaurant)

sequelize .sync()
//.sync({force: true})
.then(result => {
    app.listen(process.env.PORT || 3000)
})
.catch(err=> console.log(err))