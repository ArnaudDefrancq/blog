import { Request } from "express";

declare module "express" {
    export interface Request {
      user?: { id_user: number; id_role: number };
    }
  }