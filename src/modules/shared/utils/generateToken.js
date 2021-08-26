import JWT from "jsonwebtoken";
import config from "../../../config/config";
const generateJWT = (data) => {
  const expiry = new Date();
  const SECRET = config.JWT_SECRET;
  expiry.setDate(expiry.getDate() + 7);
  return JWT.sign(
    {
      id: data._id,
      name: data.name,
      exp: parseInt(expiry.getTime() / 1000),
    },
    SECRET
  );
};

export { generateJWT };
