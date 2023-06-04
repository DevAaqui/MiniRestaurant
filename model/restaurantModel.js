const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Restaurant = sequelize.define('restaurantlist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    totalReviews: {
        type:Sequelize.INTEGER,
        default:0
    }

})

module.exports = Restaurant