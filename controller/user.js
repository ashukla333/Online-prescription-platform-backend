// import bcrypt from "bcrypt";
// import { user } from "../models/user.js";
// import { generateToken } from "../utils/feature.js";

// export const getUser = async (req, res) => {
 
//   try {
//     const data = await user.find({});
//     res.status(200).json({
//       status: true,
//       statusCode: 200,
//       message: "get user SucessFully!",
//       data:req.user
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllUser = async (req, res) => {
//   try {
//     const data = await user.find({});
//     res.status(200).json({
//       status: true,
//       statusCode: 200,
//       message: "get user SucessFully!",
//       data: [...data],
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createUser = async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   try {
//     if (password === confirmPassword) {
//       if (name && email && password && confirmPassword) {
//         const hashPass = await bcrypt.hash(password, 10);

//         const createdData = await user.create({
//           name,
//           password: hashPass,
//           email,
//         });
//         if (hashPass && createdData) {
//           res.status(200).json({
//             status: true,
//             statusCode: 200,
//             message:
//               "🎉 Signup successful! Welcome aboard! Your account has been created",
//           });
//         }
//       } else {
//         res.status(200).json({
//           status: false,
//           statusCode: 400,
//           message: "user not created",
//         });
//       }
//     } else {
//       res.status(200).json({
//         status: false,
//         statusCode: 400,
//         message: "your password with confirmPassword not match",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       status: false,
//       statusCode: 401,
//       message: "internal server error",
//     });
//   }
// };

// export const updatePasswordUser = async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;

//   try {
//     // Ensure passwords match
//     if (password !== confirmPassword) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 400,
//         message: "Password and confirm password do not match",
//       });
//     }

//     // Ensure all fields are provided
//     if (!userId || !password) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 400,
//         message: "User ID and password are required",
//       });
//     }

//     // Hash the new password
//     const hashPass = await bcrypt.hash(password, 10);

//     // Update the user's password
//     const updatedUser = await user.findByIdAndUpdate(
//       userId,
//       { password: hashPass },
//       { new: true }
//     );

//     // Check if the user was found and updated
//     if (!updatedUser) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 400,
//         message: "User not found or update failed",
//       });
//     }

//     // Success response
//     res.status(200).json({
//       status: true,
//       statusCode: 200,
//       message: "Password updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({
//       status: false,
//       statusCode: 500,
//       message: "Internal server error",
//     });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 400,
//         message: "Email is required",
//       });
//     }

//     if (!password) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 400,
//         message: "Password is required",
//       });
//     }

//     const verifyEmail = await user.findOne({ email }).select("+password");

//     if (!verifyEmail) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 404,
//         message: "Email not found",
//       });
//     }

//     const passwordVerify = await bcrypt.compare(password, verifyEmail.password);

//     if (!passwordVerify) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 401,
//         message: "Invalid password",
//       });
//     }

//     const token = generateToken(verifyEmail);

//     if (!token) {
//       return res.status(200).json({
//         status: false,
//         statusCode: 500,
//         message: "Something went wrong! Could not generate token.",
//       });
//     }
//     res.cookie("AuthToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV,
//       sameSite: "Lax",
//     });

//     return res.status(200).json({
//       status: true,
//       statusCode: 200,
//       message: "Login successful! 🎉",
//       data: {
//         token,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: false,
//       statusCode: 500,
//       message: "Internal server error",
//     });
//   }
// };
