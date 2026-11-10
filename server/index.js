const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || "https://naga123-prog.github.io";

const io = new Server(server, {
    cors: { origin: [FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:5500"], methods: ["GET", "POST"] }
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: [FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:5500"] }));
app.use(express.json());

// ─── DATABASE SETUP ─────────────────────────

const dbPath = process.env.DB_PATH || path.join(__dirname, "doomsday.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quiz_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        hero TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY CHECK(id = 1),
        count INTEGER DEFAULT 0
    );

    INSERT OR IGNORE INTO visitors (id, count) VALUES (1, 0);
`);

// ─── VISITOR COUNTER ────────────────────────

app.post("/api/visit", (req, res) => {
    db.prepare("UPDATE visitors SET count = count + 1 WHERE id = 1").run();
    const row = db.prepare("SELECT count FROM visitors WHERE id = 1").get();
    res.json({ count: row.count });
});

app.get("/api/visitors", (req, res) => {
    const row = db.prepare("SELECT count FROM visitors WHERE id = 1").get();
    res.json({ count: row.count });
});

// ─── REVIEWS / COMMENTS ─────────────────────

app.get("/api/reviews", (req, res) => {
    const reviews = db.prepare(
        "SELECT id, username, rating, comment, created_at FROM reviews ORDER BY created_at DESC LIMIT 50"
    ).all();
    res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
    const { username, rating, comment } = req.body;

    if (!username || !rating || !comment) {
        return res.status(400).json({ error: "username, rating, dan comment wajib diisi" });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating harus 1-5" });
    }
    if (username.length > 50) {
        return res.status(400).json({ error: "Username maks 50 karakter" });
    }
    if (comment.length > 500) {
        return res.status(400).json({ error: "Komentar maks 500 karakter" });
    }

    const result = db.prepare(
        "INSERT INTO reviews (username, rating, comment) VALUES (?, ?, ?)"
    ).run(username.trim(), rating, comment.trim());

    const review = db.prepare("SELECT * FROM reviews WHERE id = ?").get(result.lastInsertRowid);
    io.emit("new-review", review);
    res.status(201).json(review);
});

// ─── QUIZ LEADERBOARD ───────────────────────

app.post("/api/quiz", (req, res) => {
    const { username, hero } = req.body;
    if (!username || !hero) {
        return res.status(400).json({ error: "username dan hero wajib diisi" });
    }
    if (username.length > 50) {
        return res.status(400).json({ error: "Username maks 50 karakter" });
    }

    db.prepare("INSERT INTO quiz_results (username, hero) VALUES (?, ?)").run(username.trim(), hero);

    const stats = db.prepare(`
        SELECT hero, COUNT(*) as total FROM quiz_results GROUP BY hero ORDER BY total DESC
    `).all();

    const totalPlayers = db.prepare("SELECT COUNT(*) as c FROM quiz_results").get().c;
    io.emit("quiz-update", { stats, totalPlayers });
    res.json({ stats, totalPlayers });
});

app.get("/api/quiz/stats", (req, res) => {
    const stats = db.prepare(`
        SELECT hero, COUNT(*) as total FROM quiz_results GROUP BY hero ORDER BY total DESC
    `).all();
    const totalPlayers = db.prepare("SELECT COUNT(*) as c FROM quiz_results").get().c;
    const recent = db.prepare(
        "SELECT username, hero, created_at FROM quiz_results ORDER BY created_at DESC LIMIT 10"
    ).all();
    res.json({ stats, totalPlayers, recent });
});

// ─── LIVE CHAT (Socket.IO) ──────────────────

const chatHistory = [];
const MAX_HISTORY = 100;
let onlineUsers = 0;

io.on("connection", (socket) => {
    onlineUsers++;
    io.emit("online-count", onlineUsers);

    socket.emit("chat-history", chatHistory);

    socket.on("chat-msg", (data) => {
        if (!data.username || !data.message) return;
        if (data.username.length > 30 || data.message.length > 300) return;

        const msg = {
            username: data.username.trim(),
            message: data.message.trim(),
            time: new Date().toISOString()
        };

        chatHistory.push(msg);
        if (chatHistory.length > MAX_HISTORY) chatHistory.shift();

        io.emit("chat-msg", msg);
    });

    socket.on("typing", (username) => {
        socket.broadcast.emit("typing", username);
    });

    socket.on("disconnect", () => {
        onlineUsers--;
        io.emit("online-count", onlineUsers);
    });
});

// ─── HEALTH CHECK ───────────────────────────

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        name: "Avengers Doomsday API",
        endpoints: ["/api/visitors", "/api/reviews", "/api/quiz/stats"]
    });
});

// ─── START SERVER ───────────────────────────

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Doomsday API running on port ${PORT}`);
});
