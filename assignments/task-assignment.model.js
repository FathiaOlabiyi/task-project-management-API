const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  
  assignerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

  assignedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

  assignedAt: {
    type: Date,
  },

  deletedAt: {
    type: Date,
  },

  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
}, {
    timestamps: true
});

module.exports = mongoose.model("Task-assignment", Schema);