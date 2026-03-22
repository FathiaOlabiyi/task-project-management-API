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
    },

    fileType: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
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

module.export = mongoose.model("Attachment", Schema);