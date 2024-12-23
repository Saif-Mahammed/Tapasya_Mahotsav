import { connectToDatabase } from "../../lib/dbConnect";
import { Event } from "../../models/Event";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const events = await Event.find();
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch events" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
