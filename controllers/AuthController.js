const repo = require("../repository/UserRepository");
const jwttocken = require("jsonwebtoken");
const SECRET_KEY = "this is my secret key for News App Project";

const RegisterUser = (req, res) => {
  repo.RegisterUser(req.body).then((data) => {
    res.send(data);
  });
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

module.exports = { RegisterUser, LoginUser, VerifyToken };

