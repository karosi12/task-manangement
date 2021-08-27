import JWT from "jsonwebtoken";
import Response from "../utils/responses";
const SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  try {
    let token =
      req.headers.authorization === undefined ? "" : req.headers.authorization;
    if (token.includes("Bearer")) {
      const checkBearer = req.headers.authorization.split(" ");
      token = checkBearer[1];
    } else {
      token = req.headers.authorization;
    }
    if (!token)
      return res.status(401).send(Response.error(400, "Unauthorised access"));
    const authVerify = await JWT.verify(token, SECRET);
    if (!authVerify)
      return res.status(401).send(Response.error(401, "JWT token has expired"));
    req.decoded = authVerify;
    req.body.userId = authVerify.id; // inject user id in request body
    next();
  } catch (error) {
    if (error.message === "jwt expired")
      return res.status(401).send(Response.error(401, error.message));
    if (error.message)
      return res.status(401).send(Response.error(401, error.message));
    if (error)
      return res
        .status(500)
        .send(
          Response.error(500, "Something went wrong about user login token")
        );
  }
};
export default authenticate;
