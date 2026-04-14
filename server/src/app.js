import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/v1/api.routes.js";
import webhookRoutes from "./routes/v1/webhookRoutes/webhook.routes.js";
// Load environment variables
dotenv.config();

const app = express();

// ==============================
// CORS CONFIGURATION
// ==============================
const rawOrigins = process.env.ALLOWED_ORIGINS;
const isDev = process.env.NODE_ENV === "development";

// Determine allowed origins
let allowedOrigins = [];
if (rawOrigins) {
  allowedOrigins = rawOrigins.split(",").map((origin) => origin.trim());
} else if (isDev) {
  // ✅ Allow your frontend in development
  allowedOrigins = ["http://localhost:5173"];
} else {
  console.warn(
    "⚠️ ALLOWED_ORIGINS not set. CORS will block all cross-origin requests.",
  );
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = `CORS blocked request from origin: ${origin}`;
      console.warn(msg);
      return callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true, // ✅ Required for cookies / auth headers
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware (handles preflight automatically)
app.use(cors(corsOptions));

// ==============================
// BODY PARSER
// ==============================
// Standard JSON parser, but preserve raw body for webhooks
app.use("/api/webhooks", express.raw({ type: "*/*" }));

// ✅ Webhook routes
app.use("/api/webhooks", webhookRoutes);

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
// ERROR HANDLING (Optional but recommended)
// ==============================
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  if (err.message.startsWith("CORS blocked")) {
    // CORS errors should return a 403 with a specific message
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal server error" });
});

// ==============================
// START SERVER (if not used as a module)
// ==============================
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`   Allowed origins: ${allowedOrigins.join(", ") || "none"}`);
  });
}

export default app;
