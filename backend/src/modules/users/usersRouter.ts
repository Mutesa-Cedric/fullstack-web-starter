import { Router } from "express";
import UserController from "./usersController";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);

const userRouter = router;
export default userRouter;