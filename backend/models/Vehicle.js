const mongoose = require("mongoose");
const { Schema } = mongoose;

const vehicleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    chassisNo: {
        type: String,
        required: true,
    },
    fuelType:{
        type: String,
        required: true,
        enum: ["Petrol", "Diesel", "CNG", "Electric"],
    },
    makerModel:{
        type: String,
        required: true,
    },
    kmRun: {
        type: Number,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    registrationNo:{
        type: String,
        required: true,
        unique: true,
    },
    blobId: {
        type: String,
        required: true,
    },

});

const vehicleModel = mongoose.model("Vehicle", vehicleSchema);
module.exports = vehicleModel;