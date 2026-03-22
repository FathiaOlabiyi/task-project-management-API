const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },

    invitedEmail: {
        type: String,
        required: true
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    status: {
        type: String,
        enum: ["draft", "sent", "pending", "expired", "accepted", "rejected", "revoked"]
    },

    token: {
        type: String,
        required: true
    },

    scheduleSend: {
        type: Date
    },

    expiresAt: {
        type: Date
    },

    sentAt: {
        type: Date
    },

    respondedAt: {
        type: Date
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

module.export = mongoose.model("Invitation", Schema)