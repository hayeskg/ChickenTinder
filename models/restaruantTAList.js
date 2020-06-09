const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantTAListSchema = new Schema({
  list: [
    {
      type: Schema.Types.ObjectId,
      ref: 'RestaurantTA'
    }
  ]
});

module.exports = mongoose.model('RestaurantTAList', restaurantTAListSchema)