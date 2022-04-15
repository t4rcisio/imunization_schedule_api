import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const UserAuth = (request, response, next) => {
  console.log(request.url);
  if (
    request.url === "/nurse/new" ||
    request.url === "/nurse/login" ||
    request.url === "/" ||
    request.url === "/patient/login" ||
    request.url === "/patient/new"
  )
    return next();

  const { auth_session } = request.cookies;
  if (!auth_session) return response.send("<h2>Go to login</h2>");

  try {
    const token = jsonwebtoken.verify(
      auth_session,
      process.env.SECRET_KEY_TOKEN
    );
  } catch (error) {
    return response.send("Invalid token");
  }
  return next();
};

export default UserAuth;
