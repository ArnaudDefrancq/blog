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
    }
}

export default new PostRoute().router;