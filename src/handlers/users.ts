import express, { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD } = process.env;

const userRoutes = (app: express.Application) => {
  app.get("/users", listUsers);
  app.get("/users/:id", showUser);
  app.post("/users", createUser);
};

const user = new UserModel();

const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await user.index();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const displayedUser = await user.show(req.params.id);

    res.status(200).json(displayedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    req.body.password = bcrypt.hashSync(
      req.body.password + BCRYPT_PASSWORD,
      10
    );
    const createdUser = await user.create(req.body);

    res.status(200).json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default userRoutes;
