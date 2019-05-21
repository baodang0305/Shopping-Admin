const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const manuSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    Address: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    Phonenumber: {
      type: String,
      required: true
    }
});

const Manu = mongoose.model("Manufacturer", manuSchema);
module.exports = Manu;
