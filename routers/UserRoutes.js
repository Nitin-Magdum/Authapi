const router = require("express").Router();
const passport = require("passport");
const { RegisterUser, LoginUser,VerifyToken } = require("../controllers/AuthController");

//   VerifyToken,

router.post("/register", RegisterUser);
router.post("/isAuthenticated", VerifyToken);
router.post("/login", passport.authenticate("local"), LoginUser);

module.exports = router;
