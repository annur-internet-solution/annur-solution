const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

/* =========================
   SIMPLE DATABASE (UPGRADE LATER TO MONGODB)
========================= */
let users = [];
let memory = [];

/* =========================
   REGISTER USER
========================= */
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = {
        id: Date.now(),
        name,
        email,
        password: hashed
    };

    users.push(user);

    res.json({ message: "User created successfully" });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.id }, "ANNUR_SECRET");

    res.json({ token, user });
});

/* =========================
   AI MEMORY SYSTEM
========================= */
app.post("/api/memory/save", (req, res) => {
    const { userId, message } = req.body;

    memory.push({
        userId,
        message,
        time: new Date()
    });

    res.json({ success: true });
});

app.get("/api/memory/:id", (req, res) => {
    const data = memory.filter(m => m.userId == req.params.id);
    res.json(data);
});

/* =========================
   AI RESPONSE ENGINE (SIMPLE)
========================= */
app.post("/api/ai/chat", (req, res) => {
    const { message } = req.body;

    let reply = "Ban gane ka tambaya sosai.";

    if (message.includes("suna")) {
        reply = "Ni ANNUR AI ne, na yi ka ne.";
    }

    res.json({ reply });
});

app.listen(5000, () => console.log("ANNUR SERVER RUNNING ON PORT 5000"));