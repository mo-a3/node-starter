const router = require("express").Router();
const getLoggedInUser = require("../middleware/getLoggedInuser");
const {
  RegisterUser,
  GetAllUsers,
  DeleteUser,
  GetOneUser,
  UpdateUser,
  LoginUser,
} = require("./user.controllers");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.use(getLoggedInUser);
router.get("/get-all-users", GetAllUsers);
router.get("/get-one-user/:id", GetOneUser);
router.put("/update-user/:id", UpdateUser);
router.delete("/delete-user/:id", DeleteUser);

module.exports = router;
