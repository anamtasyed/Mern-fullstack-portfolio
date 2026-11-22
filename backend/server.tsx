import dotenv from "dotenv";
import {fileURLToPath} from "url";
import path from "path";

const backendEnvPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    ".env"
);
dotenv.config({path: backendEnvPath});

import express from "express";
import cors from "cors";

import connectDB from "./config/db"; // database connection

// import API routes
import authRoutes from "./routes/auth.routes";
import educationRoutes from "./routes/education.routes";
import projectRoutes from "./routes/project.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = [
    CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
];

// Middleware

app.use(
    cors({
      origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
          } else {
              callback(new Error("Origin not allowed"));
          }
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
   })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running successfully."
    });
});
// API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/education", educationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

// 404 Not Found Handler 
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
        
    });
});  
// Start server 
const startServer = async(): Promise<void> => {
     try{
        // connect to MongoDB first
        await connectDB();
        // Start Express server 
        app.listen(PORT, () => {
            console.log("--------------------------------");
            console.log("Portfolio Backend Started");
            console.log(`Server: http://localhost:${PORT}`);
            console.log(`Frontend: ${CLIENT_URL}`);
            console.log(`Health: http://localhost:${PORT}/api/health`);
            console.log("---------------------------------");

        });
     } catch (error) {
           console.error("Unable to start server: ", error);
           process.exit(1);
     }
};

// Start application
startServer();
export default app;

