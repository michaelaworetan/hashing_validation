import { Router } from "express";
import { getUsers, addUser, loginUser, verifyUser } from "../controllers/user";

const router = Router()

router.get('/', getUsers)

router.post('/addUser', addUser)

router.post('/userSignIn', loginUser)

router.post('/verifyUser', verifyUser)

export default router