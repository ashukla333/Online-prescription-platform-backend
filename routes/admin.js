import express from 'express'
import {  addAdminUser, getAdmin} from '../controller/admin.js';
// import { isAuthenticated } from '../middleware/auth.js';

const router=express.Router()

router.post("/createAdmin",addAdminUser)
router.post("/loginAdmin",getAdmin)

export default router;