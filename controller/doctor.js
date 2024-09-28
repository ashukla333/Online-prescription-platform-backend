import { doctor } from "../models/doctor.js";
import bcrypt from "bcrypt";
import { getAllDoctorsList, getDoctor } from "../service/doctor-service.js";
import cloudinary from "cloudinary";
import path from "path";
import streamifier from 'streamifier';

cloudinary.v2.config({
  cloud_name: "dhdkujtqq",
  api_key: "881717377834428",
  api_secret: "-1TebCjBkITPj9AWLEs7EwcDg_U",
});

export const addDoctor = async (req, res) => {
    try {
      const { name, email, phoneNumber, yearOfExp, specialty } = req.body;

      const checkEmailAndPhoneNumber = await getDoctor(email, phoneNumber);
      if (checkEmailAndPhoneNumber) {
        return res.status(409).json({
          status: false,
          statusCode: 409,
          message: checkEmailAndPhoneNumber?.message,
        });
      }
      console.log(req.file)
      // Direct upload to Cloudinary using buffer (stream)
      let profilePicture = '';
      if (req.file) {
        // Create a promise to upload the image to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' }, // Automatically detect resource type (e.g., image, video)
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              throw new Error('Cloudinary upload failed');
            }
            console.log({result})
            // The result contains the secure_url after the image is uploaded
            profilePicture = result.secure_url;
            console.log({profilePicture})
          }
        );
  
        // Convert the buffer to a stream and pipe it to Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      }
      console.log("fi______rst")

      const newDoctor = {
        name,
        email,
        phoneNumber,
        yearOfExp,
        specialty,
        profilePicture,
      }
  console.log(newDoctor)
  return
      await doctor.create(newDoctor);
  
      return res.status(200).json({
        status: true,
        message: "Doctor created successfully!",
        data: newDoctor,
      });
  
    } catch (error) {
      console.log(error)
    }
  };

export const loginDoctor = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const checkEmailAndPhoneNumber = await getDoctor(email, phoneNumber);
    if (!checkEmailAndPhoneNumber) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "user not Avalaible",
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Login SuccessFully! ",
      data: checkEmailAndPhoneNumber.data,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const getDrList = await getAllDoctorsList();
    if (getDrList && getDrList.length > 0) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Doctor fetch succesfully!",
        data: getDrList,
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

export const getAllDoctorsById = async (req, res) => {
  try {
    const { id } = req.params;
    const getDrList = await getAllDoctorsList(id);
    if (getDrList) {
      // let profilePictureLink = `${req.protocol}://${req.get('host')}/${getDrList.profilePicture}`;
      const profilePictureLink = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${path.basename(getDrList.profilePicture)}`;

      console.log({ profilePictureLink });
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Doctor fetch succesfully!",
        data: {
          _id: getDrList._id,
          name: getDrList.name,
          email: getDrList.email,
          phoneNumber: getDrList.phoneNumber,
          specialty: getDrList.specialty,
          profilePicture: profilePictureLink,
          createdAt: getDrList.createdAt,
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
