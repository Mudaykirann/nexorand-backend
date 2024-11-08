import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      success: false,
      message: "Authorization header is missing or malformed",
      errorMessage: "Authorization header must be in the format 'Bearer <token>'",
    });
  }


  // Verify token

  const token = authHeader.split(' ')[1];
  console.log("Received Token: ", token); // Log the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to authenticate token",
        error: err.message
      });
    }
    // Save the user ID from the token
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
