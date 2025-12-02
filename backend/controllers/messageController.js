import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const newMsg = await Message.create({ name, message });
    res.status(201).json(newMsg);
  } catch (err) {
    console.error("Create message error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
