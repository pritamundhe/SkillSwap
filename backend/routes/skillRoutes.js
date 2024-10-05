import express from "express";
import { addSkill } from "../controllers/skillController.js";

const router = express.Router();

router.post('/addSkill', addSkill);


export default router;