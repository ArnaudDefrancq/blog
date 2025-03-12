import express from "express";
import dotenv from "dotenv";
import UserRoute from "./Routes/UserRoute";
import PostRoute from "./Routes/PostRoute";
import path from "path";
import CommentRoute from "./Routes/CommentRoute";
import Like_postRoute from "./Routes/Like_postRoute";
import "./Types/express";

dotenv.config();

const PORT = process.env.PORT_SERVER;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/comment', CommentRoute);
app.use('/like-post', Like_postRoute);
// 
app.use('/imgPost', express.static(path.join(__dirname, '../../Images/imgPost')));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});