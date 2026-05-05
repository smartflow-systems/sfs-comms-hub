import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict to same-origin by default; override via CORS_ORIGIN env var
const allowedOrigin = process.env.CORS_ORIGIN || false;
app.use(cors({
  origin: allowedOrigin,
  credentials: false
}));

// Rate limiting
const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." }
});
const leadSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many submissions, please try again later." }
});

app.use(defaultLimiter);

// Body parsing
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// Admin API key middleware for protected routes
function requireAdminKey(req, res, next) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return res.status(503).json({ success: false, message: "Admin access not configured" });
  }
  const providedKey = req.headers["x-admin-key"] || req.query.key;
  if (!providedKey || providedKey !== adminKey) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}

// Load config once at startup
const config = JSON.parse(readFileSync("./public/site.config.json", "utf-8"));

// Ensure data directory exists
const dataDir = "./data";
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const leadsFile = join(dataDir, "leads.json");
if (!existsSync(leadsFile)) {
  writeFileSync(leadsFile, JSON.stringify({ leads: [] }, null, 2));
}

function readLeads() {
  try {
    const data = readFileSync(leadsFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading leads file");
    return { leads: [] };
  }
}

function writeLeads(data) {
  try {
    writeFileSync(leadsFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing leads file");
    return false;
  }
}

// Static files
app.use(express.static("public"));

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// API: Submit Lead (rate-limited)
app.post("/api/leads", leadSubmitLimiter, (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, source } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required"
      });
    }

    // Field length limits
    if (
      String(firstName).length > 100 ||
      String(lastName).length > 100 ||
      String(email).length > 254
    ) {
      return res.status(400).json({ success: false, message: "Input exceeds allowed length" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const data = readLeads();

    const existingLead = data.leads.find(lead => lead.email === String(email).toLowerCase());
    if (existingLead) {
      return res.status(200).json({
        success: true,
        message: "Lead already exists",
        leadId: existingLead.id
      });
    }

    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      firstName: String(firstName).slice(0, 100),
      lastName: String(lastName).slice(0, 100),
      email: String(email).toLowerCase().slice(0, 254),
      company: company ? String(company).slice(0, 200) : "",
      phone: phone ? String(phone).slice(0, 30) : "",
      source: source ? String(source).slice(0, 50) : "direct",
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.leads.push(newLead);

    if (!writeLeads(data)) {
      throw new Error("Failed to save lead");
    }

    console.log(`New lead captured [id=${newLead.id}]`);

    res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      leadId: newLead.id
    });

  } catch (error) {
    console.error("Lead submission error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// API: Get All Leads — admin only, requires X-Admin-Key header
app.get("/api/leads", requireAdminKey, (_req, res) => {
  try {
    const data = readLeads();
    res.json({ success: true, count: data.leads.length, leads: data.leads });
  } catch (error) {
    console.error("Error fetching leads:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch leads" });
  }
});

// API: Stripe Checkout (placeholder)
app.post("/api/stripe/checkout", (req, res) => {
  try {
    const { planId } = req.body;

    if (!planId || typeof planId !== "string" || planId.length > 50) {
      return res.status(400).json({ success: false, message: "Invalid plan ID" });
    }

    let pricingData;
    try {
      pricingData = JSON.parse(readFileSync("./public/pricing.json", "utf-8"));
    } catch {
      return res.status(500).json({ success: false, message: "Pricing configuration unavailable" });
    }

    const plan = pricingData.plans.find(p => p.id === planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    res.json({
      success: true,
      message: "Stripe integration pending",
      planId,
      plan: plan.name,
      price: plan.price,
      url: `/contact.html?plan=${encodeURIComponent(planId)}`
    });

  } catch (error) {
    console.error("Checkout error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create checkout session" });
  }
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({ success: false, message: "Internal server error" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`sfs-comms-hub serving on port ${port}`));
export default app;
