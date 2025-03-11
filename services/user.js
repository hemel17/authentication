const User = require("../models/User");

// * create a new user
const createNewUser = (userData) => {
  return User.create(userData);
};

// * find existing user
const findExistingUser = (email, phone) => {
  const conditions = [];

  if (email) {
    conditions.push({ email, accountVerified: true });
  }

  if (phone) {
    conditions.push({ phone, accountVerified: true });
  }

  if (conditions.length === 0) {
    return null;
  }

  return User.findOne({ $or: conditions });
};

// * total registration attempts by user
const registrationAttempts = (email, phone) => {
  const conditions = [];

  if (email) {
    conditions.push({ email, accountVerified: false });
  }

  if (phone) {
    conditions.push({ phone, accountVerified: false });
  }

  if (conditions.length === 0) {
    return [];
  }

  return User.find({ $or: conditions });
};

module.exports = { createNewUser, findExistingUser, registrationAttempts };
