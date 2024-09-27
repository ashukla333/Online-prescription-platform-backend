import jwt from "jsonwebtoken";

export const generateToken = (email) => {
  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};
