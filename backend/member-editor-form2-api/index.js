// index.js
import express from "express";
import cors from "cors";

const app = express();

// JSON body parsing
app.use(express.json());

// CORS allow (so Front can call this server)
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
  }),
);

// temporary DB: members array stored in memory only
let members = [
  { id: 1, name: "Leanne Graham", company: { name: "Romaguera-Crona" } },
  { id: 2, name: "Ervin Howell", company: { name: "Deckow-Crist" } },
  { id: 3, name: "Clementine Bauch", company: { name: "Romaguera-Jacobson" } },
  { id: 4, name: "Patricia Lebsack", company: { name: "Lebsack-Bode" } },
  { id: 5, name: "Chelsey Dietrich", company: { name: "Keebler-Lindgren" } },
  { id: 6, name: "Mrs. Dennis Schulist", company: { name: "Howell-Schultz" } },
  { id: 7, name: "Kurtis Weissnat", company: { name: "Considine-Lockman" } },
];

// GET /api/members (list)
app.get("/api/members", (req, res) => {
  res.send(members);
});

// GET /api/members/:id (single)
app.get("/api/members/:id", (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);
  if (!member) {
    return res.status(404).send("Member not found");
  }
  res.send(member);
});

// POST /api/members (create new member)
app.post("/api/members", (req, res) => {
  const { name, company } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .send("Name is required and must be at least 3 characters");
  }
  if (!company || !company.name) {
    return res.status(400).send("Company name is required");
  }

  const newMember = {
    id: members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1,
    name,
    company: { name: company.name },
  };

  members.push(newMember);
  res.status(201).send(newMember);
});

// PUT /api/members/:id (update member)
app.put("/api/members/:id", (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);
  if (!member) {
    return res.status(404).send("Member not found");
  }

  const { name, company } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .send("Name is required and must be at least 3 characters");
  }
  if (!company || !company.name) {
    return res.status(400).send("Company name is required");
  }

  member.name = name;
  member.company = { name: company.name };

  res.send(member);
});

// DELETE /api/members/:id (delete member)
app.delete("/api/members/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).send("Member not found");
  }

  members.splice(index, 1);
  res.status(204).send(); // empty success response
});

// start server
const port = 3003;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}...`);
});
