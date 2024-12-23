import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  anchor: { type: String, required: true },
});

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
