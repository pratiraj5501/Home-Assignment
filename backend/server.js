import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./dbConnect.js";
import router from "./routes/linkRoute.js";
import redirectRouter from "./routes/redirectRouter.js"
import { redirectOriginalURL } from "./controller/redirectController.js";

dotenv.config();

const app = express();
const PORT=5000;

// Middlewares
const allowedOrigins = ["http://localhost:5173", "http://example.com"];
app.use(cors({
  origin:allowedOrigins,
  methods:["GET","POST","DELETE"],

}));
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

// Health check route (required by assignment)

app.get("/healthz", (req, res) => {
  return res.status(200).json({
    ok: true,
    version: "1.0",
    status:"Okey"
  });
});

// Root route (temporary)
app.get("/", (req, res) => {
  res.send("TinyLink backend is running...");
});
app.use("/api",router)
app.use("/:code",redirectOriginalURL)

// Start server
 
 

async function startServer(){
    await connectDB();
    app.listen(PORT,()=>{
      console.log(`Server running on http://localhost:${PORT}`);

    })
}
startServer()