import express from 'express'
import UserRoute from "./admin.js";
import DoctorRoute from "./doctor.js";
import PatientRoute from "./patient.js";
import ConsultationRoute from "./consultation.js";
import {  addAdminUser} from '../controller/admin.js';
// import { isAuthenticated } from '../middleware/auth.js';

const router=express.Router()

router.use('/admin', UserRoute);
router.use('/doctor', DoctorRoute);
router.use('/patient', PatientRoute);
router.use('/consultation', ConsultationRoute);

export default router;