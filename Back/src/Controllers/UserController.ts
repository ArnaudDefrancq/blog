import { Request, Response, NextFunction } from "express";
import { Security } from "../Tools/Security";
import { Tools } from "../Tools/Tools";
import { UserModel } from "../Models/UserModel";
import { User } from "../Types/User";
import { Folders } from "../Tools/Folders";
import { Auth } from "../Tools/Auth";

export class UserController {

    private static async getOneById(id: number): Promise<User | null> {
        const userModel: UserModel = new UserModel();
        const result: Array<User> = await userModel.findById(id);
        if (!result || result.length == 0) {
            return null;
        }
        return result[0];
    }

    public static async signUp(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            if (req.body.email == ""  || !req.body.email || req.body.pseudo == "" || !req.body.pseudo || req.body.password == "" || !req.body.password) {
                return res.status(400).json({error: "Tous les champs ne sont pas remplient"})
            }

            if (await Security.checkEmail(req.body.email)) {
                return res.status(409).json({ message: 'Email not unique' });
            }

            const userModel: UserModel = new UserModel();
            const hash: string = await Security.hashPassword(req.body.password);
            const date: number = Tools.dateToTimestamp();

            const user: User = {
                email: req.body.email,
                password: hash,
                pseudo: req.body.pseudo,
                created_at: date,
                id_role: 2
            }

            userModel.createUser(user, async(error, insertId) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json({error: "Probleme lors de la création du user | " + error})
                } else {
                    await Folders.createFolder(String(insertId));
                    res.status(201).json({message: "User créé | " + insertId});
                    return insertId;
                }
            })
        } catch (error) {
            return res.status(500).json({error})
        }
    }

    public static async signIn(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            if (req.body.email == ""  || !req.body.email || req.body.password == "" || !req.body.password) {
                return res.status(400).json({error: "Tous les champs ne sont pas remplient"})
            }
            
            if (!await Security.checkEmail(req.body.email)) {
                return res.status(409).json({ message: 'Email non trouvé' });
            }
            
            const userModel: UserModel = new UserModel();
            
            const result: Array<User> = await userModel.findUser(`WHERE email='${req.body.email}'`, 'id_user, id_role, password');
            
            const user: User = result[0];
            
            const passwordMatch: boolean = await Security.checkPassword(req.body.password, user.password);
            
            if (!passwordMatch) {
                return res.status(401).json({error: "Les password ne correspondent pas"})
            } 

            if (user.id_user && user.id_role) {
                const token = Auth.generateToken({user_id: user.id_user, role_id: user.id_role});

                res.status(200).json({user_id: user.id_user, role_id: user.id_role, token});
                            
                return user.id_user;
            }
            
        } catch (error) {
            return  res.status(500).json({error});   
        }
    }

    public static async logOut (req: Request, res: Response, next: NextFunction) : Promise<void | any> {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({error: "error lors de la déconnexion | " + error});
            }
            return res.status(200).json({message: "Déconnecté OK"});
        })
    }

    public static async getAllUser(req: Request, res: Response, next: NextFunction): Promise<Array<User> | any> {
        try {
            const userModel: UserModel = new UserModel();

            const arrayUser: Array<User> = await userModel.findUser("");

            if (!arrayUser || arrayUser.length == 0) {
                res.status(400).json({error: "Aucun user trouvé"})
                return [];
            }

            res.status(200).json(arrayUser);
            return arrayUser;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });    
        }
    }

    public static async getOneUser(req: Request, res: Response, next: NextFunction): Promise<User | any> {
       try {
            const idUser: number = Number(req.params.id);
            if (isNaN(idUser)) {
                return res.status(400).json({ error: 'ID Profil invalide' });  
            }

            const user: User | null = await UserController.getOneById(idUser);
            
            if (!user) {
                return res.status(400).json({error: "Pas  de user trouvé"});
            }

            res.status(200).json(user);
            return user;
       } catch (error) {
            return res.status(500).json({error});
       }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            const idUser: number = Number(req.params.id);
            if (isNaN(idUser)) {
                return res.status(400).json({ error: 'ID Profil invalide' });  
            }

            const user: User | null = await UserController.getOneById(idUser);

            if (!user) {
                return res.status(400).json({error: "Pas  de user trouvé"});
            }
            
            if  (user.id_user != req.user?.id_user) {
                return res.status(401).json({error: "unauthorized"});
            }

            const userModel: UserModel = new UserModel();

            const hash: string = req.body.password ?  await Security.hashPassword(req.body.password) : user.password;
            const updateUser : Partial<User> = {
                email: req.body.email ? req.body.email : user.email,
                password: hash,
                pseudo: req.body.pseudo ? req.body.pseudo : user.pseudo,
            }

            userModel.updateUser(idUser, updateUser, (error, affectedRow) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de l'update user | " + error});
                }
                res.status(200).json({message: "User update | " + affectedRow})
                return user.id_user;
            })
            

        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            const idUser: number = Number(req.params.id);
            if (isNaN(idUser)) {
                return res.status(400).json({ error: 'ID Profil invalide' });  
            }

            const user: User | null = await UserController.getOneById(idUser);

            if (!user) {
                return res.status(400).json({error: "Pas  de user trouvé"});
            }
            
            if  (user.id_user != req.user?.id_user) {
                return res.status(401).json({error: "unauthorized"});
            }

            const userModel: UserModel = new UserModel();
            
            userModel.deleteUser(idUser, (error, affectedRow) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de la suppression | " + error});
                } 
                
                req.session.destroy((error) => {
                    if (error) { 
                        console.log("Échec de la destruction de la session | " + error);
                        return res.status(500).json({ error: "Erreur lors de la suppression de la session" });
                    }
            
                    console.log("Session supprimée avec succès");
                    res.status(200).json({ message: "Utilisateur supprimé avec succès avec sa session" });
                });
                return idUser;
            })

        } catch (error) {
            return res.status(500).json({error: 'Erreur interne du serveur'});
        }
    }
}