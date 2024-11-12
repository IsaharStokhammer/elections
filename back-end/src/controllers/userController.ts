import { Request, Response } from "express";
import UserSchema, { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";
import CandidateModel from "../models/CandidateModel";

export const createUser = async (req: Request, res: Response) => {
  const newUserBasic: any = req.body;
  const userNameExisted = await UserSchema.findOne({
    userName: newUserBasic.userName,
  });
  try {
    if (userNameExisted){
      res.status(400).json({ massage: "user name already existed" });
      return}
    const newUser = new UserSchema({
      userName: newUserBasic.userName,
      password: newUserBasic.password,
      isAdmin: false,
      hasVoted: false,
      votedFor: null,
    });
    const newUserCreated = await UserSchema.create(newUser);
    res
      .status(201)
      .json({ massage: "user created successfully, id:", newUserCreated });
  } catch (err) {
    res
      .status(400)
      .json({ massage: "something went wrong in -createUser-@userController" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    const userFound = await UserSchema.findOne({ userName });
    if (!userFound) {
      throw new Error();
    } else {
      const userId = userFound._id;
      const newToken = jwt.sign({ userId ,isAdmin: userFound.isAdmin }, process.env.SECRET_KEY as string, {
        expiresIn: "1h",
      });
      res.status(200).json({ token: newToken, user : userFound });
    }
  } catch (err) {
    res.status(400).json({ message: "user or password is incorrect" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const candidates = await UserSchema.find();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(400).json({
      massage: "something went wrong in -getCandidates-@userController",
    });
  }
};

export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await CandidateModel.find();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(400).json({
      massage: "something went wrong in -getCandidates-@userController",
    });
  }
};
