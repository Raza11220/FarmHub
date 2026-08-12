import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "farmhub_secret", {
    expiresIn: "7d",
  });

export default generateToken;
