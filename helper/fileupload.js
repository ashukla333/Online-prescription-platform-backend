// import multer from "multer"
// import path from "path";

// // const multer  = require('multer')
// export const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//     // filename: (req, file, cb) => {
//     //     cb(null, Date.now() + path.extname(file.originalname)); // Ensure extension is included
//     //   },
//     //   filename: (req, file, cb) => {
//     //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     //     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//     //   }
//   })



import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent in ES modules
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

// Create the uploads directory if it doesn't exist
import fs from 'fs';

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  }),
});