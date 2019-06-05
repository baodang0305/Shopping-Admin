const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    Username: {type: String},
    Password: {type: String},
    Email: {type: String}
});

const account = mongoose.model("Account", accountSchema);
module.exports = account;
