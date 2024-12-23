import { connectToDatabase } from "../../../lib/dbConnect";
import { Event } from "../../../models/Event";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      return res.status(201).json(savedEvent);
    } catch (error) {
      return res.status(500).json({ error: "Failed to add event" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
