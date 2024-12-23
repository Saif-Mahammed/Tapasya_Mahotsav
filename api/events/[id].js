import { connectToDatabase } from "../../../lib/dbConnect";
import { Event } from "../../../models/Event";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deletedEvent = await Event.findByIdAndDelete(id);

      if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }

      return res.status(200).json(deletedEvent);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete event" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
