const mongoose = require("mongoose");


const Schema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            require: true,
            unique: true
        },

        description: {
            type: String,
            minLength: 10,
            maxLength: 200
        },

        status: {
            type: String,
            enum: ["planning", "active", "on_hold", "completed", "archived"],
            default: "planning"
        },

        dueDate: {
            type: Date
        },
        startedAt: {
            type: Date
        },
        deletedAt: {
            type: Date
        },
}, {
    timestamps: true
});

module.exports = mongoose.model("Project", Schema);