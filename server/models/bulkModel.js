const mongoose = require("mongoose");
const db = require("../db");

const { Schema } = mongoose;

const bulkSchema = new Schema(
  {
    bulk_id: {
      type: Number,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
    items: {
      type: Array,
      required: false,
      default: [],
    },
    frequency: {
      type: String,
      required: false,
    },
    delivery_starting_date: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    bulk_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bulkModel = db.model("bulks", bulkSchema);

module.exports = bulkModel;
