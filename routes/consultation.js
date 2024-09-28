import express from "express";
import {
  addConsultation,
  getConsultation,
  getDrConsultation,
} from "../controller/consultation.js";
// import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post("/createConsultation", addConsultation);
router.get("/getConsultation", getConsultation);
router.get("/getConsultationByDrId/:id", getDrConsultation);
export default router;
