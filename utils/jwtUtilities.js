const jwt = require("jsonwebtoken");
const jwt_key = "thisizmysecretkey";

const CreateToken = async (id) => {
  console.log("id", id);
  try {
    const token = await jwt.sign({ id }, jwt_key, { expiresIn: "1D" });
    return token;
  } catch (error) {
    console.error("Token creation error:", error);
    throw error; // Rethrow the error for handling in the controller
  }
};

const validateToken = async (token) => {
  return await jwt.verify(token, jwt_key);
};

module.exports = {
  CreateToken,
  validateToken,
};
