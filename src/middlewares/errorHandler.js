const { AppError } = require("../errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      status: "Error",
      code: err.statusCode,
      message: err.message,
    });

  res.status(500).json({
    status: "Error",
    code: 500,
    message: `Internal server error - ${err.message}`,
  });
};

module.exports = { errorHandler };
