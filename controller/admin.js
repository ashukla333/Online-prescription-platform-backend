import { getUser } from "../service/admin-service.js";
import { admin } from "../models/admin.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/feature.js";

export const addAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getAdmin = await getUser(email);
    if (getAdmin) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Already Exist",
      });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const createObject = {
      email,
      password: hashPass,
    };
    await admin.create(createObject);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "user Created ",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let passwordVerify = false;
    const getAdmin = await getUser(email);
    if (getAdmin) {
      passwordVerify = await bcrypt.compare(password, getAdmin.password);
    }
    if (getAdmin && passwordVerify) {
      const token = generateToken(email);

      if (!token) {
        return res.status(200).json({
          status: false,
          statusCode: 500,
          message: "Something went wrong! Could not generate token.",
        });
      }
      res.cookie("AuthToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "Lax",
      });

      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Login successful! 🎉",
        data: {
          token,
        },
      });
    }

    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Not Fount ",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
