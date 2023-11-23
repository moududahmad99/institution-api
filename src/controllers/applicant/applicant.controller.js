const createHttpError = require("http-errors");
const bcrypt = require('bcryptjs');
const Applicant = require("../../models/applicant.model");
const { successResponse } = require("../response/response.controller");
const { createJWTToken } = require("../../helper/jwt.helper");
const { JWT_ACCESS_KEY } = require("../../secret");

//@description : controller for getting all applicants data
//@route       : GET /applicant
//@access      : admin only
const getApplicants = async (req, res, next) => {
  try {
    //getting query parameters from validation middleware
    const { page, limit } = req.validatedQuery;

    //pagination setup
    let pageInt = parseInt(page) || 1;
    let limitInt = parseInt(limit) || 10;
    const skip = (pageInt - 1) * limitInt;

    //finding documents
    const applicants = await Applicant.find().limit(limitInt).skip(skip).exec();

    //counting total documents
    const totalDocuments = await Applicant.countDocuments();

    //sending success response
    return successResponse(res, {
      message: "Data returned successfully",
      payload: {
        applicants,
        currentPage: pageInt,
        totalPages: Math.ceil(totalDocuments / limitInt),
        totalApplicants: totalDocuments,
        hasNext: pageInt < Math.ceil(totalDocuments / limitInt) ? true : false,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@description : create a applicant
//@route       : POST /applicant
//@access      : public
const createApplicant = async (req, res, next) => {
  try {
    //getting query parameters from joi validation middleware
    const { username } = req.validateBody;

    // checking username exists or not in DB
    const isExist = await Applicant.findOne({ username });

    //sending exists error
    if (isExist) {
      throw createHttpError(409, "Username already exists");
    }

    //creating new applicant
    const applicant = await Applicant.create(req.validateBody);

    // sending successful response
    return successResponse(res, {
      statusCode: 201,
      message: "Successfully created",
      payload: {
        applicant,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@description : create a applicant
//@route       : POST /applicant
//@access      : public
const applicantLogin = async (req, res, next) => {
  try {
    // //getting username and password from joi validation middleware
    const { username, password } = req.validateBody;

    // applicant with given username exists or not
    const applicant = await Applicant.findOne({ username }).select("+password");

    if (!applicant) {
      throw createHttpError(401, "Invalid Credentials");
    }

    // compare the password
    const isPasswordsMatch = await bcrypt.compare(password, applicant.password);
    if (!isPasswordsMatch) {
      throw createHttpError(401, "Invalid Credentials");
    }

    const data = { id: applicant._doc._id };
    // token, cookie

    const accessToken = createJWTToken(data, JWT_ACCESS_KEY, "120 days");
    

    // set cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 24 * 120 * 1000,
      httpOnly: true,
      path: "/",
    });

    // successful response
    return successResponse(res, {
      statusCode: 200,
      message: "Admin were logged in successfully",
      payload: {
        applicant: { ...applicant._doc, password: undefined },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@description : logout applicant
//@route       : POST /applicants/logout
//@access      : applicant olny
const applicantLogout = async (req, res, next) => {
  try {
    //clear cookies
    res.clearCookie("accessToken");
    // successful response
    return successResponse(res, {
      statusCode: 200,
      message: "Applicant logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}


//@description : get a applicant data
//@route       : GET /applicants/:applicantId
//@access      : admin & applicant
const getSingleApplicant = async (req, res, next) => {
  try {
    const { applicantId } = req.params;

    //check if applicant id provided or not
    if (!applicantId) {
      throw createHttpError(404, "Applicant id is not provided");
    }
    //check valid applicant id or not
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      throw createHttpError(404, "Applicant not found");
    }

    //sending success response
    return successResponse(res, {
      payload: {
        applicant,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@description : update a applicant data
//@route       : PUT /applicants/:applicantId
//@access      : applicant and admin
const updateSingleApplicant = async (req, res, next) => {
  try {
    const { applicantId } = req.params;

    //check if applicant id provided or not
    if (!applicantId) {
      throw createHttpError(404, "Applicant id is not provided");
    }

    //check valid applicant id or not
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      throw createHttpError(404, "Applicant not found");
    }

    await Applicant.findByIdAndUpdate(applicantId, req.validateBody);

    //sending success response
    return successResponse(res, {
      message: "Applicant data updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

//@description : delete a applicant data
//@route       : DELETE /applicants/:applicantId
//@access      : admin only
const deleteSingleApplicant = async (req, res, next) => {
  try {
    const { applicantId } = req.params;

    //check if applicant id provided or not
    if (!applicantId) {
      throw createHttpError(404, "Applicant id is not provided");
    }

    //check valid applicant id or not
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      throw createHttpError(404, "Applicant not found");
    }

    //deleting applicant data
    await Applicant.findByIdAndDelete(applicantId);

    //sending success response
    return successResponse(res, {
      message: "Applicant deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//exporting
module.exports = {
  getApplicants,
  createApplicant,
  applicantLogin,
  getSingleApplicant,
  updateSingleApplicant,
  deleteSingleApplicant,
  applicantLogout
};
