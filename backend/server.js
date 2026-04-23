const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory DB
let polls = [];

// Create Poll
app.post("/polls", (req, res) => {
  const { question, options } = req.body;

  if (!question || options.length < 2) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const poll = {
    id: Date.now().toString(),
    question,
    options: options.map(opt => ({ text: opt, votes: 0 })),
    createdAt: new Date()
  };

  polls.push(poll);
  res.json(poll);
});

// Get all polls
app.get("/polls", (req, res) => {
  res.json(polls);
});

// Vote
app.post("/polls/:id/vote", (req, res) => {
  const { optionIndex } = req.body;
  const poll = polls.find(p => p.id === req.params.id);

  if (!poll) return res.status(404).json({ error: "Poll not found" });

  const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!poll.voters) poll.voters = [];

  if (poll.voters.includes(userIP)) {
    return res.status(403).json({ error: "You already voted from this IP" });
  }

  poll.options[optionIndex].votes++;
  poll.voters.push(userIP);

  res.json(poll);
});

// Delete poll
app.delete("/polls/:id", (req, res) => {
  polls = polls.filter(p => p.id !== req.params.id);
  res.json({ message: "Deleted successfully" });
});

// Get results
app.get("/polls/:id/results", (req, res) => {
  const poll = polls.find(p => p.id === req.params.id);
  if (!poll) return res.status(404).json({ error: "Poll not found" });

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  const results = poll.options.map(opt => ({
    text: opt.text,
    votes: opt.votes,
    percentage: totalVotes
      ? ((opt.votes / totalVotes) * 100).toFixed(1)
      : 0
  }));

  res.json({ question: poll.question, results, totalVotes });
});

app.listen(5000, () => console.log("Server running on port 5000"));