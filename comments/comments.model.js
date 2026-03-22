const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    entityType: {
      type: String,
      enum: ["project", "task"],
      required: true
    },

    content: {
        type: String,
        required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    deletedAt: {
      type: Date,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  },
  {
    timestamps: true,
  },
);

module.export = mongoose.model("Comment", Schema);