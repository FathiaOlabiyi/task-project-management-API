const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },

    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },

    deletedAt: {
        type: Date
    },

    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Role-assignment", Schema)