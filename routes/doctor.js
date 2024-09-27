import express from 'express'
import { addDoctor, getAllDoctors, getAllDoctorsById, loginDoctor } from '../controller/doctor.js';
// import { isAuthenticated } from '../middleware/auth.js';
// const multer  = require('multer')
import {storage} from '../helper/fileupload.js'
import multer from 'multer';

const router=express.Router()
const upload = multer({ storage });

router.post("/createDoctor",upload.single('avatar'),addDoctor)
router.get("/getAllDoctors",getAllDoctors)
router.get("/getDoctorsById/:id",getAllDoctorsById)
router.post('/loginDoctor',loginDoctor)

export default router;