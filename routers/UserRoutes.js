const router = require("express").Router();
const passport = require("passport");
const { User,UpdatUser,RegisterUser, LoginUser,VerifyToken ,forgotpassword,setpassword,logout} = require("../controllers/AuthController");

//   VerifyToken,
router.get("/getregister/:id",User)
router.put("/getuserupdate/:id",UpdatUser)
router.post("/register", RegisterUser);
router.post("/isAuthenticated", VerifyToken);
router.post("/login", passport.authenticate("local"), LoginUser);
router.post("/forgotpassword", forgotpassword);
router.post("/setpassword", setpassword);
router.post("/logout", logout)

module.exports = router;
