import { admin } from "../models/admin.js";

export const getUser = async (email) => {
  try {
    const getmyUser = await admin.findOne({ email: email });
    if (getmyUser) {
      return getmyUser;
    }

    return false;
    
  } catch (error) {
    console.log(error);
    return false;
  }
};
