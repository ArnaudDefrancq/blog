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
        this.router.get('/user', AuthMiddleware.authenticateJWT, UserController.infoConnect);
        this.router.post('/logout', AuthMiddleware.authenticateJWT, UserController.logOut);
        this.router.get('/', AuthMiddleware.authenticateJWT, UserController.getAllUser);
        this.router.get('/:id', AuthMiddleware.authenticateJWT, UserController.getOneUser);
        this.router.put('/:id/update', AuthMiddleware.authenticateJWT, UserController.updateUser);
        this.router.delete('/:id', AuthMiddleware.authenticateJWT, UserController.deleteUser)
    }
}

export default new UserRoute().router;