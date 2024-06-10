import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../../utils/bcrypt";
import { validateUser } from './userValidator';

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
            res.status(201).json({
                success: true,
                newUser
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
            res.status(200).json({
                success: true,
                user
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}