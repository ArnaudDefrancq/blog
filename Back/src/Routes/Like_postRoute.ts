import express, { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { Like_postController } from "../Controllers/Like_postController";

class Like_postRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", AuthMiddleware.authenticateJWT, Like_postController.createLikePost);
        this.router.get("/", AuthMiddleware.authenticateJWT, Like_postController.getAllLikePost);
        this.router.get("/:id", AuthMiddleware.authenticateJWT, Like_postController.getOneLikePost);
        this.router.delete("/:id", AuthMiddleware.authenticateJWT, Like_postController.deleteLikePost);
    }
}


export default new Like_postRoute().router;