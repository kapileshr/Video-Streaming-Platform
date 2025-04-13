import express from "express";

import auth from "./routes/auth.route.js";
import movie from "./routes/movie.route.js";
import tvshow from "./routes/tvshow.route.js";
import search from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { authDone } from "./middleware/authDone.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); // (impo) allow us to parse req.body
app.use(cookieParser()); // to get cookie for the authDone

app.use("/api/auth", auth);
app.use("/api/movie", authDone, movie);
app.use("/api/tvshow", authDone, tvshow);
app.use("/api/search", authDone, search);

app.listen(PORT, () => {
  console.log("server in 5000");
  connectDB();
});
