import express, { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { checkAccessToken, getAccessToken } from "../middleware/auth";

dotenv.config();

const { BCRYPT_PASSWORD } = process.env;

const userRoutes = (app: express.Application) => {
  app.post("/users", createUser);
  app.get("/users", checkAccessToken, listUsers);
  app.get("/users/:id", checkAccessToken, showUser);
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

    createdUser.password = "";

    res
      .status(200)
      .json({ user: createdUser, accessToken: getAccessToken(createdUser) });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default userRoutes;
