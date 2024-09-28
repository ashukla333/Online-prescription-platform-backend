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

// Set up multer storage
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure uploads folder exists and use an absolute path
    cb(null, path.join(__dirname, '../uploads')); // Change this line
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });
  