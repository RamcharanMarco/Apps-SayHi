const express = require("express");
const router = express.Router();
const {
  editUser,
  deleteUser,
  getUser,
  changePassword,
  checkPassword,
  editSettings,
  getUserSettings,
  getAuthHistory,
} = require("../controllers/userController");

const Auth = require("../middlewear/requireAuth");
router.use(Auth);

router.post("/edit/:id", editUser);

router.post("/setting/:id", editSettings);
router.get("/setting/:id", getUserSettings);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

router.post("/passwordchange/:id", changePassword);

router.post("/password/check/:id", checkPassword);

router.post("/auth/history/:id", getAuthHistory);


module.exports = router;
