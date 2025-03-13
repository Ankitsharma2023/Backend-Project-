import {Router } from "express";
import { registerUser } from "../controllers/user.controller";
const router = Router();


router.route("/register").post((req, res) => {
    res.json({ message: "Route is working!" });
});


export default router;