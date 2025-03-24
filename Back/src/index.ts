import express from "express";
import dotenv from "dotenv";
import UserRoute from "./Routes/UserRoute";
import PostRoute from "./Routes/PostRoute";
import path from "path";
import CommentRoute from "./Routes/CommentRoute";
import Like_postRoute from "./Routes/Like_postRoute";
import "./Types/express";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT_SERVER;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
}

app.use(cors(corsOptions))
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5173');
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });;

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

const imagesPath = path.resolve(__dirname, '../Images/imgPost');
app.use('/imgPost', express.static(imagesPath));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});