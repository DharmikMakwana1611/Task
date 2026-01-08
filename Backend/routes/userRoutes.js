const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  updateUserBySr,
  deleteUser,
  deleteUserBySr
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/sr/:srNo", updateUserBySr);
router.delete("/sr/:srNo", deleteUserBySr);




module.exports = router;
