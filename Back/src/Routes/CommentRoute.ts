import express, { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { CommentController } from "../Controllers/CommentController";

export class CommentRoute {
    public router: Router;
    
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", AuthMiddleware.authenticateJWT, CommentController.createComment);
        this.router.get("/", AuthMiddleware.authenticateJWT, CommentController.getAllComment);
        this.router.get("/:id/post/user", AuthMiddleware.authenticateJWT, CommentController.getAllCommentWithUserByPost);
        this.router.get("/:id/user", AuthMiddleware.authenticateJWT, CommentController.getOneCommentWithUser);
        this.router.delete("/:id", AuthMiddleware.authenticateJWT, CommentController.deleteComment);
    }
    
}

export default new CommentRoute().router;