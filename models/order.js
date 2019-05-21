const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    CustomerId:{
        type: String,
        required: true
    },
    OrderDate: {
      type: Date,
      required: true
    },
    ProductId: {
      type: String,
      required: true
    },
    ReceiverPhonenumber: {
      type: String,
      required: true
    },
    ReceiverAddress: {
      type: String,
      required: true
    },
    ReceiverName: {
      type: String,
      required: true
    }
});

const Order = mongoose.model("Manufacturer", orderSchema);
module.exports = Order;
