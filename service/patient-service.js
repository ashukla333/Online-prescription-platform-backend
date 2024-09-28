import { patient } from "../models/patient.js";

export const getPatient = async (email, phoneNumber) => {
  try {
    let matchConditionForPhone = {
      phoneNumber: phoneNumber,
    };
    let matchConditionForEmail = {
      email: email,
    };

    const getEmail = await patient.findOne(matchConditionForEmail);
    if (getEmail) {
      return {
        message: "Email Already Exist",
        data:getEmail
      };
    }
    const getPhone = await patient.findOne(matchConditionForPhone);
    if (getPhone) {
      return {
        message: "phone number Already Exist",
        data:getPhone
      };
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllpatientsList = async (id=false) => {
  try {
    if(id){
        const getAllpatientByIDs = await patient.findOne({_id:id});
        return getAllpatientByIDs
    }
    const getAllpatient = await patient.find({});
    return getAllpatient
  } catch (error) {
    return false;
  }
};
