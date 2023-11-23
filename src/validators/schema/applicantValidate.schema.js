const Joi = require("joi");

// validating applicant data
const applicantBodyValidateSchema = Joi.object({
  username: Joi.string().alphanum().lowercase().min(3).max(20).required(),
  password: Joi.string().min(6).required(),
  confirmPassword : Joi.valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
  studentNameEn: Joi.string().required(),
  studentNameBn: Joi.string().required(),
  emergencyMobile: Joi.string().required(),
  birthDate: Joi.date().required(),
  nationalId: Joi.string(),
  grade: Joi.string(),
  gender: Joi.string().required(),
  religion: Joi.string().required(),
  academicInstitution: Joi.string(),
  institutionAddress: Joi.string(),
  previousClass: Joi.string().required(),
  fatherNameEn: Joi.string().required(),
  motherNameEn: Joi.string().required(),
  fatherNameBn: Joi.string().required(),
  motherNameBn: Joi.string().required(),
  fatherMobile: Joi.string().required(),
  motherMobile: Joi.string().required(),
  fatherProfession: Joi.string().required(),
  motherProfession: Joi.string().required(),
  fatherEmail: Joi.string().lowercase(),
  motherEmail: Joi.string().lowercase(),
  fatherNID: Joi.string().required(),
  motherNID: Joi.string().required(),
  guardianInfo: Joi.string().required(),
  presentAddress: Joi.string().required(),
});

// validating applicant login data
const applicantLoginBodyValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Defining a validation schema for the query parameters of applicant
const applicantQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

//validating applicant update body data
const applicantUpdateSchema = Joi.object({
  username: Joi.string().alphanum().lowercase().min(3).max(20),
  password: Joi.string().min(6),
  studentNameEn: Joi.string(),
  studentNameBn: Joi.string(),
  emergencyMobile: Joi.string(),
  birthDate: Joi.date(),
  nationalId: Joi.string(),
  grade: Joi.string(),
  gender: Joi.string(),
  religion: Joi.string(),
  academicInstitution: Joi.string(),
  institutionAddress: Joi.string(),
  previousClass: Joi.string(),
  fatherNameEn: Joi.string(),
  motherNameEn: Joi.string(),
  fatherNameBn: Joi.string(),
  motherNameBn: Joi.string(),
  fatherMobile: Joi.string(),
  motherMobile: Joi.string(),
  fatherProfession: Joi.string(),
  motherProfession: Joi.string(),
  fatherEmail: Joi.string().lowercase(),
  motherEmail: Joi.string().lowercase(),
  fatherNID: Joi.string(),
  motherNID: Joi.string(),
  guardianInfo: Joi.string(),
  presentAddress: Joi.string(),
});

//exporting
module.exports = {
  applicantQuerySchema,
  applicantBodyValidateSchema,
  applicantLoginBodyValidationSchema,
  applicantUpdateSchema
};
