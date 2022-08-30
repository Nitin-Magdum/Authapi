const repo = require("../repository/UserRepository");
const jwttocken = require("jsonwebtoken");
const SECRET_KEY = "this is my secret key for News App Project";
let otp=0
const RegisterUser = (req, res) => {
  repo.RegisterUser(req.body).then((data) => {
    res.send(data);
  });
};
const User = (req, res) => {
  repo.User(req.params.id).then((data) => {
    res.send(data);
  });
};
const UpdatUser = (req, res) => {
  repo.UpdatUser(req.params.id,req.body).then((data) => {
  
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
    res.send({status: 200, msg: "otp sent" })
    }
  else {
     res.send({ status: 401,msg:"Email is not found"})
  }
})
}
const setpassword = (req, res) => {
  var a=req.body.otp+''
  if (a != otp) {
    res.send({ status: 500, msg: "Invalid OTP" })
}
else {
  repo.setpassword(req.body).then(data => {
      if (data.status === 400) {
          res.send({ status: 400, msg: "Password didn't match " })
      }
      else if (data.status === 200) {
          res.send({ status: 200, msg: "password changed successfully" })
      }
  })
}
};
const LoginUser = (req, res) => {
    // console.log(req.session.passport);
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
const logout = (req, res) => {
          req.session.destroy(err => {
              if (!err) {
                res.send({ status: 200, message: 'Logout successful' })
              } else {
                res.status(400).send('Unable to log out')
              }
          });
     
}
module.exports = { User,UpdatUser,RegisterUser, LoginUser, VerifyToken,forgotpassword ,setpassword,logout };

