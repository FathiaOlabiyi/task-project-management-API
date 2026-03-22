const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
  //make addedBy compulsory with joi

  deletedAt: {
    type: Date,
  },

  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
}, {
    timestamps: true
});

module.exports = mongoose.model("Member", Schema);

