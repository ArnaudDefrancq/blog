import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import UserRoute from "./Routes/UserRoute";
import session from "express-session";
import { RedisStore } from "connect-redis";
import Redis from "ioredis";
import PostRoute from "./Routes/PostRoute";
import path from "path";


dotenv.config();

const PORT = process.env.PORT_SERVER;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redisClient = new Redis("redis://localhost:6379")


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

declare module "express-session" {
    interface SessionData {
        id_user: number,
        id_role: number
    }
}

app.use(session({
  name: "sessionUser",
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_KEY!, // Clé secrète pour signer les cookies
  resave: false, // Évite de sauvegarder la session si elle n'a pas changé
  saveUninitialized: true, // Ne crée pas de session vide si false
  cookie: {
    secure: process.env.NODE_ENV === "production", // ❗ Mettre `true` en production avec HTTPS
      httpOnly: true, // Empêche l'accès JS au cookie
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // Durée de 7 jours
  }
}));

redisClient.on("connect", () => console.log("✅ Connexion à Redis réussie !"));


app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

app.use('/user', UserRoute);
app.use('/post', PostRoute);

app.use('/imgPost', express.static(path.join(__dirname, '../../Images/imgPost')));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});