const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        required: true
        },

    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permissions",
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Role-permission", Schema);