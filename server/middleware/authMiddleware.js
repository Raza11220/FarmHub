import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new AppError(401, "Not authorized, no token provided."));
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "farmhub_secret");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new AppError(401, "User not found for this token."));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError(401, "Not authorized, token failed."));
  }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError(403, "You do not have permission to access this resource."));
  }

  next();
};
