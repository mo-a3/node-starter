const userModel = require("./user.model");
const { CreateToken, validateToken } = require("../../utils/jwtUtilities");

const RegisterUser = async (req, res) => {
  try {
    const ExUser = await userModel.find({
      email: req.body.email,
    });
    if (ExUser.length > 0) {
      return res.status(403).send({ message: "Email already exists" });
    }
    const user = await userModel.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const GetAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const users = await userModel.find().skip(skip).limit(limit);
    const total = await userModel.countDocuments();
    const totalPages = Math.ceil(total / limit);
    return res.send({
      data: users,
      total,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const GetOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const UpdateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const DeleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.send({ message: "User deleted successfully", user });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(403).send({ message: "Email Does not Exist" });
    if (user.password !== password)
      return res.status(403).send({ message: "Invalid email or password" });
    let token = await CreateToken(user._id.toString());
    let _ = res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.send({ message: "Logged in successfully", user });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  RegisterUser,
  GetAllUsers,
  GetOneUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
};
