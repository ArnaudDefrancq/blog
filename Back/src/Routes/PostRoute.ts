import express, { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { PostController } from "../Controllers/PostController";
import { MulterMiddleware } from "../Middlewares/MulterMiddleware";

class PostRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", AuthMiddleware.auth, MulterMiddleware.getMulterConfigPost("imgPost"), PostController.createPost);
        this.router.get("/", AuthMiddleware.auth, PostController.getAllPost);
        this.router.get("/user", AuthMiddleware.auth, PostController.getAllPostWithUser);
        this.router.get("/:id", AuthMiddleware.auth, PostController.getOnePost);
        this.router.get("/:id/user", AuthMiddleware.auth, PostController.getAllPostWithUser);
    }
}

export default new PostRoute().router;