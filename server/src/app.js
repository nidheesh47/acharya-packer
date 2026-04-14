import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import apiRoutes from "./routes/v1/api.routes.js";
import webhookRoutes from "./routes/webhook/webhook.routes.js";

dotenv.config();

const app = express();

// ==============================
// CORS CONFIGURATION
// ==============================
const rawOrigins = process.env.ALLOWED_ORIGINS;
const isDev = process.env.NODE_ENV === "development";

let allowedOrigins = [];

if (rawOrigins) {
  allowedOrigins = rawOrigins.split(",").map((origin) => origin.trim());
} else if (isDev) {
  allowedOrigins = ["http://localhost:5173"];
} else {
  console.warn("⚠️ ALLOWED_ORIGINS not set.");
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS blocked: ${origin}`), false);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// ==============================
// 🔴 WEBHOOK (RAW BODY) — MUST COME FIRST
// ==============================
app.use("/api/webhooks", express.raw({ type: "*/*" }));
app.use("/api/webhooks", webhookRoutes);

// ==============================
// NORMAL JSON PARSER (AFTER WEBHOOK)
// ==============================
app.use(express.json());

// ==============================
// HEALTH CHECK
// ==============================
app.get("/", (req, res) => {
  res.send("API running");
});

// ==============================
// API ROUTES
// ==============================
app.use("/api", apiRoutes);

// ==============================
// ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: err.message });
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
