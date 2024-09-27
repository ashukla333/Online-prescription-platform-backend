import { doctor } from "../models/doctor.js";

export const getDoctor = async (email, phoneNumber) => {
  try {
    let matchConditionForPhone = {
      phoneNumber: phoneNumber,
    };
    let matchConditionForEmail = {
      email: email,
    };

    const getEmail = await doctor.findOne(matchConditionForEmail);
    if (getEmail) {
      return {
        message: "Email Already Exist",
        data:getEmail
      };
    }
    const getPhone = await doctor.findOne(matchConditionForPhone);
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

export const getAllDoctorsList = async (id=false) => {
  try {
    if(id){
        const getAllDoctorByIDs = await doctor.findOne({_id:id});
        return getAllDoctorByIDs
    }
    const getAllDoctor = await doctor.find({});
    return getAllDoctor
  } catch (error) {
    return false;
  }
};
