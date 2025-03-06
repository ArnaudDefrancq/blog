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
        this.router.post("/", AuthMiddleware.auth, CommentController.createComment);
        this.router.get("/", AuthMiddleware.auth, CommentController.getAllComment);
        this.router.get("/user", AuthMiddleware.auth, CommentController.getAllCommentWithUser);
        this.router.get("/:id/user", AuthMiddleware.auth, CommentController.getOneCommentWithUser);
        this.router.delete("/:id", AuthMiddleware.auth, CommentController.deleteComment);
    }
    
}

export default new CommentRoute().router;