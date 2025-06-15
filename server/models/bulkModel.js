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
      required: true,
    },
    items: {
      type: Array,
      default: [],
    },
    frequency: {
      type: String,
      required: true,
    },
    delivery_starting_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bulkModel = db.model("bulks", bulkSchema);

module.exports = bulkModel;
