import { doctor } from "../models/doctor.js";
import bcrypt from "bcrypt";
import { getAllDoctorsList, getDoctor } from "../service/doctor-service.js";
// const path = require('path');
// const fs = require('fs');
import fs from "fs";
import path from "path";
import ImageKit from "imagekit";
const imagekit = new ImageKit({
    publicKey: 'public_XF6RAjjNoqiV5Pa8n0U4jT1sw1E=',
    privateKey: "private_/V9K1KM1YfBZzUbKYt2MVoDh1Yg=",
    urlEndpoint: "https://ik.imagekit.io/9dxlvqfhi",
});

export const addDoctor = async (req, res) => {
  try {
    const { name, profilePicture, email, phoneNumber, yearOfExp,specialty } = req.body;
    const { filename } = req.file;
    // console.log(req.file,req.file.originalname)
    let result=await  imagekit.upload({
        file: req.file.path, // The file buffer
        fileName: req.file.originalname, // The file name
    })

    // console.log(result)
    // return
    const checkEmailAndPhoneNumber = await getDoctor(email, phoneNumber);
    if (!checkEmailAndPhoneNumber) {
      let createObject = {
        name: name,
        profilePicture: filename,
        email: email,
        phoneNumber: phoneNumber,
        yearOfExp: yearOfExp,
        specialty:specialty
      };
      await doctor.create(createObject);
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Doctor is Created succesfully!",
      });
    }
    return res.status(409).json({
      status: false,
      statusCode: 409,
      message: checkEmailAndPhoneNumber?.message,
    });
  } catch (error) {
    console.log(error);
    return error;
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
          specialty:getDrList.specialty,
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
