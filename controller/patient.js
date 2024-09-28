import { patient } from "../models/patient.js";
import bcrypt from "bcrypt";
import path from "path";
import cloudinary from "cloudinary";
import { getPatient } from "../service/patient-service.js";
import { getAllpatientsList } from "../service/patient-service.js";

cloudinary.v2.config({
  cloud_name: "dhdkujtqq",
  api_key: "881717377834428",
  api_secret: "-1TebCjBkITPj9AWLEs7EwcDg_U",
});

export const addPatient = async (req, res) => {
    try {
      const {
        name,
        email,
        age,
        phoneNumber,
        yearOfExp,
        historyOfIllness,
        historyOfSurgery,
      } = req.body;
      // const { filename } = req.file;
      const checkEmailAndPhoneNumber = await getPatient(email, phoneNumber);
      if (checkEmailAndPhoneNumber) {
        return res.status(409).json({
          status: false,
          statusCode: 409,
          message: checkEmailAndPhoneNumber?.message,
        });
      }
  
      let profilePicture = '';
  
     
      console.log("Checking if file exists...");
      if (req.file) {
        console.log("File found:", req.file);
  
        try {
          const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, 
            { resource_type: 'auto', public_id: `doctor_${name}` } 
          );
  
          // Log the result of the Cloudinary upload
          console.log("Cloudinary upload result:", result);
  
        
          profilePicture = result.secure_url;
          console.log('Download URL:', profilePicture);
        } catch (uploadError) {
          console.error('Upload failed:', uploadError);
          return res.status(500).json({
            status: false,
            message: 'File upload failed.',
          });
        }
  
      } else {
        console.log("No file uploaded.");
      }
      let createObject = {
        name: name,
        profilePicture: profilePicture,
        email: email,
        phoneNumber: phoneNumber,
        yearOfExp: yearOfExp,
        age:age,
        historyOfIllness: historyOfIllness,
        historyOfSurgery: historyOfSurgery,
      };
      await patient.create(createObject);
      return res.status(200).json({
        status: true,
        message: "patient is Created succesfully!",
        data: createObject,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const loginPatient = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const checkEmailAndPhoneNumber = await getPatient(email, phoneNumber);
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

export const getAllPatient = async (req, res) => {
  try {
    const getPatientList = await getAllpatientsList();
    if (getPatientList && getPatientList.length > 0) {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Patient fetch succesfully!",
        data: getPatientList,
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

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const getPatientList = await getAllpatientsList(id);
    if (getPatientList) {
      // let profilePictureLink = `${req.protocol}://${req.get('host')}/${getPatientList.profilePicture}`;
      const profilePictureLink = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${path.basename(getPatientList.profilePicture)}`;

      console.log({ profilePictureLink });
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Patient fetch succesfully!",
        data: {
          _id: getPatientList._id,
          name: getPatientList.name,
          age:getPatientList.age,
          email: getPatientList.email,
          phoneNumber: getPatientList.phoneNumber,
          profilePicture: profilePictureLink,
          historyOfSurgery: getPatientList.historyOfSurgery,
          historyOfIllness: getPatientList.historyOfIllness,
          createdAt: getPatientList.createdAt,
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
