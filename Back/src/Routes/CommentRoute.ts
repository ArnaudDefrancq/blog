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
    }
    
}

export default new CommentRoute().router;