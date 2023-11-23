const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const applicantSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [3, "Username must be greater than 3 characters"],
      lowercase : true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Admin password is required"],
      select: false,
      minlength: [6, "Admin password length must be greater than 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    studentNameEn: {
      type: String,
      required: true,
    },
    studentNameBn: {
      type: String,
      required: true,
    },
    emergencyMobile: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    nationalId: String,
    grade: String,
    gender: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    academicInstitution: String,
    institutionAddress: String,
    previousClass: {
      type: String,
      required: true,
    },
    fatherNameEn: {
      type: String,
      required: true,
    },
    motherNameEn: {
      type: String,
      required: true,
    },
    fatherNameBn: {
      type: String,
      required: true,
    },
    motherNameBn: {
      type: String,
      required: true,
    },
    fatherMobile: {
      type: String,
      required: true,
    },
    motherMobile: {
      type: String,
      required: true,
    },
    fatherProfession: {
      type: String,
      required: true,
    },
    motherProfession: {
      type: String,
      required: true,
    },
    fatherEmail: {
      type: String,
      lowercase: true,
    },
    motherEmail: {
      type: String,
      lowercase: true,
    },
    fatherNID: {
      type: String,
      required: true,
    },
    motherNID: {
      type: String,
      required: true,
    },
    guardianInfo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    transactionId: String,
    isActivated : {
      type : Boolean,
      default : false
    },
    isConfirmed:{
      type : Boolean,
      default : false
    },
  },
  { timestamps: true }
);

const Applicant = model("Applicant", applicantSchema);

module.exports = Applicant;
