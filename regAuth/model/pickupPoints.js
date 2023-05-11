const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pickUpPointSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    route: {
      type: String,
      required: true
    }
  });

  
const PickUpPoint = mongoose.model('PickUpPoint', pickUpPointSchema);

module.exports = PickUpPoint;
