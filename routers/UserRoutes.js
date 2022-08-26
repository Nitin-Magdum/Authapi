const router = require("express").Router();
const passport = require("passport");
const { RegisterUser, LoginUser,VerifyToken ,forgotpassword,setpassword} = require("../controllers/AuthController");

//   VerifyToken,

router.post("/register", RegisterUser);
router.post("/isAuthenticated", VerifyToken);
router.post("/login", passport.authenticate("local"), LoginUser);
router.post("/forgotpassword", forgotpassword);
router.post("/setpassword", setpassword);

module.exports = router;
