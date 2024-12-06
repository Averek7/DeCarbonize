const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    ownerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    vehicles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Vehicle",
        },
    ],


});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;