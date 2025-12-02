import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV === "production"
    ? ["https://kambaz-styled-js.vercel.app", "https://kambaz-styled-9msk8thet-lok-ye-s-projects.vercel.app/"]
    : "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
};

if (process.env.NODE_ENV === "production") {
  sessionOptions.proxy = true;
}

app.use(session(sessionOptions));
app.use(express.json());

console.log("Database URL:", process.env.DB_URL);
console.log("Environment:", process.env.NODE_ENV);
console.log("Session Secret:", process.env.SESSION_SECRET ? "Defined" : "Not Defined");

UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentsRoutes(app, db);
ModulesRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

app.listen(4000);