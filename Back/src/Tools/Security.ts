import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { DAO } from "../DAO/DAO";

dotenv.config();

export class Security {
    public static async hashPassword(password: string): Promise<string> {
        try {
            const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));
            return passwordHash;
        } catch (error) {
            console.error('Problem hash pasword', error)
            throw new Error('Problem Hash');
        }
    }

    public static async checkEmail(email: string): Promise<boolean> {
        try {
            const dao = new DAO('users');
            const where = `WHERE email='${email}'`;
            const result = await dao.find(where, '"email"');

            return result.length > 0; 
        } catch (error) {
            console.error('Problem checking email:', error);
            throw new Error('Problem checking email');
        }
    }

    public static async checkPassword(password: string, passwordHash: string): Promise<boolean> {
        try {
            const compare = await bcrypt.compare(password, passwordHash);
            return compare;
        } catch (error) {
            console.error('Problem checking password:', error);
            throw new Error('Problem checkPassword');
        }
    }
} 