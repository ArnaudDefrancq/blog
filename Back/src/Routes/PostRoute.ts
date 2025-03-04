import express, { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { PostController } from "../Controllers/PostController";

class PostRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", AuthMiddleware.auth, PostController.createPost);
    }
}

export default new PostRoute().router;