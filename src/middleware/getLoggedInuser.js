const UserModel = require("../user/user.model");
const { validateToken } = require("../../utils/jwtUtilities");

const getLoggedInUser = async (req, res, next) => {
  const Cookie = req.cookies["token"];
  const data = await validateToken(Cookie);
  if (!data) {
    res.locals.user = null;
    return next();
  }
  const { id } = data;
  const User = await UserModel.findById(id);
  res.locals.user = User;
  return next();
};

module.exports = getLoggedInUser;
