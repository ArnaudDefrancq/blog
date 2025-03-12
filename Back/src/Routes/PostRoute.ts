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
        this.router.post("/", AuthMiddleware.authenticateJWT, MulterMiddleware.getMulterConfigPost('imgPost'), PostController.createPost);
        this.router.get("/", AuthMiddleware.authenticateJWT, PostController.getAllPost);
        this.router.get("/user", AuthMiddleware.authenticateJWT, PostController.getAllPostWithUser);
        this.router.get("/:id", AuthMiddleware.authenticateJWT, PostController.getOnePost);
        this.router.get("/:id/user", AuthMiddleware.authenticateJWT, PostController.getAllPostWithUser);
        this.router.put("/:id", AuthMiddleware.authenticateJWT, MulterMiddleware.getMulterConfigPost('imgPost'), PostController.updatePost);
        this.router.delete("/:id", AuthMiddleware.authenticateJWT, PostController.deletePost);
    }
}

export default new PostRoute().router;