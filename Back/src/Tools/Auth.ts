import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export class Auth {
    private static key = process.env.JWT_KEY || "key";

    public static generateToken(payload: {user_id: number; role_id: number}): string {
        return jwt.sign(payload, this.key, { expiresIn: "7d" });
    }

    public static verifyToken(token: string): {user_id: number; role_id: number} | null {
        try {
            return jwt.verify(token, this.key) as {user_id: number; role_id: number};
        } catch (error) {
            return null;
        }
    }
}