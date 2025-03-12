const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [8, "Password must be at least 8 characters long."],
      maxLength: [32, "Password cannot be more than 32 characters."],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid phone number",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
  },
  { timestamps: true }
);

// * index for frequently queried fields
userSchema.index({ email: 1 });
userSchema.index({ resetPasswordToken: 1 });

// * hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// * check if the password is correct
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// * generate verification code
userSchema.methods.generateVerificationCode = function () {
  const verificationCode = Math.floor(10000 + Math.random() * 90000);

  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 5 * 1000 * 60;

  return verificationCode;
};

const User = model("User", userSchema);

module.exports = User;
