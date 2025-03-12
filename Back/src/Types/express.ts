import * as express from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id_user: number; id_role: number };
  }
}

export {};