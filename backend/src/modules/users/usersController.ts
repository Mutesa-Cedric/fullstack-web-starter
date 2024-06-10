import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import { validateUser } from './userValidator';
import { generateToken } from '../../utils/jwt';

const prisma = new PrismaClient();


export default class UserController {
    public static async createUser(req: Request, res: Response) {
        try {
            const user = validateUser(req.body);

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email
                },
            });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists",
                });
            }
            const newUser = await prisma.user.create({
                data: {
                    ...user,
                    password: await hashPassword(user.password),
                },
            });

            // set cookie
            const token = generateToken(newUser.id);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.status(201).json({
                success: true,
                newUser,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return res.status(400).json({
                    message: "Invalid email or password",
                });
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Invalid email or password",
                });
            }

            const token = generateToken(user.id);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            res.status(200).json({
                success: true,
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}