const { Router } = require("express");
const router = Router();

const { register, login } = require("../controllers/userController");

//User end points for authentication

router.post("/register", register);
router.post("/login", login);

module.exports = router;
