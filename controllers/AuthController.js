const repo = require("../repository/UserRepository");
const jwttocken = require("jsonwebtoken");
const SECRET_KEY = "this is my secret key for News App Project";
let otp=0
const RegisterUser = (req, res) => {
  repo.RegisterUser(req.body).then((data) => {
    res.send(data);
  });
};
const forgotpassword = (req,res) => {
  var a=Math.round(Math.random()*100000);
a+=''
otp=a
let d=repo.verifymail(req.body.email)
d.then(data => {
  if (data.status === 200) {
    repo.sendmail(req.body.email, a)
    res.send({status: 200, msg: "otp is send to your mail" })
    }
  else {
      throw err
  }
})
}
const setpassword = (req, res) => {
  var a=req.body.otp+''
  if (a != otp) {
    res.send({ status: "400", message: "Invalid OTP" })
}
else {
  repo.setpassword(req.body).then(data => {
      if (data.status === 400) {
          res.send({ status: 400, msg: "Password didn't match " })
      }
      else if (data.status === 200) {
          res.send({ status: 200, msg: "Success " })
      }
  })
}
};
const LoginUser = (req, res) => {
  //   console.log(req.session.passport);
  res.send({
    status: 200,
    token: jwttocken.sign(req.session.passport, SECRET_KEY, {
      expiresIn: "1h",
    }),
  });
};

const VerifyToken = (req, res) => {
  let result = jwttocken.verify(
    req.headers.authorization,
    SECRET_KEY,
    (err, decode) => (decode !== undefined ? decode : err)
  );
  if (result instanceof Error) {
    res.send({ status: 401, isAuthenticated: false });
  } else {
    res.send({ status: 200, isAuthenticated: true });
  }
};

module.exports = { RegisterUser, LoginUser, VerifyToken,forgotpassword ,setpassword };

