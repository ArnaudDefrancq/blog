import express, { Router } from "express";
import { UserController } from "../Controllers/UserController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

class UserRoute {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/signup', UserController.signUp);
        this.router.post('/signin', UserController.signIn);
        this.router.post('/logout', AuthMiddleware.auth, UserController.logOut);
        this.router.get('/', AuthMiddleware.auth, UserController.getAllUser);
        this.router.get('/:id', AuthMiddleware.auth, UserController.getOneUser);
        this.router.put('/:id/update', AuthMiddleware.auth, UserController.updateUser);
        this.router.delete('/:id', AuthMiddleware.auth, UserController.deleteUser)
    }
}

export default new UserRoute().router;