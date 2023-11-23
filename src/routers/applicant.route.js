const express = require("express");

//importing validation functions
const {
  reqBodyValidator,
  reqQueryValidator,
} = require("../validators/validationFun/administratorValidate.validationFun");
const {
  applicantQuerySchema,
  applicantBodyValidateSchema,
  applicantLoginBodyValidationSchema,
  applicantUpdateSchema
} = require("../validators/schema/applicantValidate.schema");

//importing controllers
const {
  getApplicants,
  createApplicant,
  applicantLogin,
  getSingleApplicant,
  updateSingleApplicant,
  deleteSingleApplicant,
  applicantLogout,
} = require("../controllers/applicant/applicant.controller");

//for protecting routes importing restriction middleware
const {
  applicantRestrict,
  applicantOrAdminRestrict,
} = require("../middlewares/auth.middleware");

//createting applicant route
const applicantRoute = express.Router();

applicantRoute
  .route("/login")
  .post(reqBodyValidator(applicantLoginBodyValidationSchema), applicantLogin);

applicantRoute.route("/logout").post(applicantRestrict, applicantLogout);

applicantRoute
  .route("/:applicantId")
  .get(applicantOrAdminRestrict, getSingleApplicant)
  .put(
    applicantOrAdminRestrict,
    reqBodyValidator(applicantUpdateSchema),
    updateSingleApplicant
  )
  .delete(applicantOrAdminRestrict, deleteSingleApplicant);

applicantRoute
  .route("/")
  .get(reqQueryValidator(applicantQuerySchema), getApplicants)
  .post(reqBodyValidator(applicantBodyValidateSchema), createApplicant);

//exporting
module.exports = applicantRoute;
