import express from 'express'
import { addDoctor, getAllDoctors, getAllDoctorsById, loginDoctor } from '../controller/doctor.js';
// import { isAuthenticated } from '../middleware/auth.js';
// const multer  = require('multer')
// import {storage} from '../helper/fileupload.js'
import multer from 'multer';
import { addPatient, getAllPatient, getPatientById, loginPatient } from '../controller/patient.js';
import { getAllpatientsList } from '../service/patient-service.js';
import { upload } from '../helper/fileupload.js';
const router=express.Router()
// const upload = multer({ storage });

router.post("/createPatient",upload.single('avatar'),addPatient)
router.get("/getAllPatient",getAllPatient)
router.get("/getPatientById/:id",getPatientById)
router.post('/loginPatient',loginPatient)

export default router;