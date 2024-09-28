import { patient } from "../models/patient.js";
import bcrypt from "bcrypt";
// const path = require('path');
// const fs = require('fs');
import fs from "fs";
import path from "path";
import { getPatient } from "../service/patient-service.js";
import { getAllpatientsList } from "../service/patient-service.js";

export const addPatient = async (req, res) => {
  try {
    const {
      name,
      profilePicture,
      email,
      phoneNumber,
      yearOfExp,
      historyOfIllness,
      historyOfSurgery,
    } = req.body;
    // const { filename } = req.file;
    const checkEmailAndPhoneNumber = await getPatient(email, phoneNumber);
    if (!checkEmailAndPhoneNumber) {
      let createObject = {
        name: name,
        profilePicture: profilePicture,
        email: email,
        phoneNumber: phoneNumber,
        yearOfExp: yearOfExp,
        historyOfIllness: historyOfIllness,
        historyOfSurgery: historyOfSurgery,
      };
      await patient.create(createObject);
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "patient is Created succesfully!",
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
          email: getPatientList.email,
          phoneNumber: getPatientList.phoneNumber,
          profilePicture: profilePictureLink,
          historyOfSurgery:getPatientList.historyOfSurgery,
          historyOfIllness:getPatientList.historyOfIllness,
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
