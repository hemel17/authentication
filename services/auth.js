const userService = require("./user");
const createError = require("../utils/error");
const validatePhoneNumber = require("../utils/validatePhoneNumber");

// * validate user inputs and phone number regex
const validateRegistrationInputs = (data) => {
  const { name, email, phone, password, verificationMethod } = data;

  if (!name || !email || !phone || !password || !verificationMethod) {
    throw createError("All fields are required", 400);
  }

  if (!validatePhoneNumber(phone)) {
    throw createError("Invalid phone number", 400);
  }
};

// * checking if user already registered
const checkUserExists = async (email, phone) => {
  const existingUser = await userService.findExistingUser(email, phone);

  if (existingUser) {
    throw createError("Email or phone is already in use", 400);
  }
};

// * registration attempts limit
const checkRegistrationAttempts = async (email, phone) => {
  const attempts = await userService.registrationAttempts(email, phone);

  if (attempts.length > 3) {
    throw createError(
      "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
      400
    );
  }
};

// * generate and send verification code
const sendVerification = async (user, verificationMethod, res) => {
  const verificationCode = await user.generateVerificationCode();
  await user.save();

  sendVerificationCode(
    verificationMethod,
    verificationCode,
    user.name,
    user.email,
    user.phone,
    res
  );
};

module.exports = {
  validateRegistrationInputs,
  checkUserExists,
  checkRegistrationAttempts,
  sendVerification,
};
