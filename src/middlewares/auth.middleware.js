const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const { JWT_ACCESS_KEY } = require("../secret");

const Admin = require("../models/admin.model");
const Applicant = require("../models/applicant.model");

/* 
    authinticated user checking
*/
exports.isAuthenticated = async (req, res, next) => {
  try {
    const access_token = req.cookies.accessToken;
    // console.log(access_token);
    if (!access_token) {
      throw createHttpError(404, "Access token missing.Please login first");
    }

    const decode = jwt.verify(access_token, JWT_ACCESS_KEY);

    if (!decode) {
      throw createHttpError(401, "Access token is not valid");
    }

    const admin = await Admin.findById(decode.id);

    if (!admin) {
      throw createHttpError(404, "Admin not found");
    }

    req.admin = admin;

    next();
  } catch (error) {
    next(error);
  }
};

/* 
    authorization user role
*/

exports.authorizeRole =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.admin.role)) {
        throw createHttpError(403, `Role ${req.admin.role} is not allowed`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };


  //checking applicant is logged in or not
exports.applicantOrAdminRestrict = async (req, res, next) => {
  try {
    const access_token = req.cookies.accessToken;

    if (!access_token) {
      throw createHttpError(404, "Access token missing. Please login first");
    }

    const decode = jwt.verify(access_token, JWT_ACCESS_KEY);

    if (!decode) {
      throw createHttpError(401, "Access token is not valid");
    }

    const applicant = await Applicant.findById(decode.id);

    const admin = await Admin.findById(decode.id);

    if (!applicant && !admin) {
      throw createHttpError(404, "Applicant/Admin not found");
    }

    req.applicant = applicant;
    req.admin = admin;

    next();
  } catch (error) {
    next(error);
  }
};

//checking applicant is logged in as a applicant or admin
exports.applicantRestrict = async (req, res, next) => {
  try {
    const access_token = req.cookies.accessToken;

    if (!access_token) {
      throw createHttpError(404, "Access token missing. Please login first");
    }

    const decode = jwt.verify(access_token, JWT_ACCESS_KEY);

    if (!decode) {
      throw createHttpError(401, "Access token is not valid");
    }

    const applicant = await Applicant.findById(decode.id);

    if (!applicant) {
      throw createHttpError(404, "Applicant not found");
    }

    req.applicant = applicant;

    next();
  } catch (error) {
    next(error);
  }
};
