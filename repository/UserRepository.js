const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");
const nodemailer = require('nodemailer');
const RegisterUser = (userdata) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: userdata.email }, (err, user) => {
      if (user) {
        resolve({
          status: 409,
          message: "User with specified email already exists",
        });
        // console.log("Email already exists")
      } else if (!user) {
        let usermodel = new UserModel();
        usermodel.firstname = userdata.firstname;
        usermodel.lastname = userdata.lastname;
        usermodel.email = userdata.email;
        usermodel.password = bcrypt.hashSync(userdata.password, 8);
        usermodel.save((err) => {
          if (!err) {
            resolve({ status: 200, message: "User registered successfully" });
          } else {
            throw err;
          }
        });
      } else {
        reject(err);
      }
    });
  });
};
function User(e) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: e }, (err, data) => {
          if (!err) {
              resolve(data);
          } else {
              reject(err);
          }
      });
  });
}
function UpdatUser(id, user){
  // console.log(id)
  // console.log(user)
  return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate({ email: id }, {firstname:user.firstname,lastname:user.lastname}, (err, data) => {
          if (!err) {
              resolve("Updated");
          } else {
            reject(err)
          }
      });
  });
}
const LoginUser = () => {
  return new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (username, password, done) {
      UserModel.findOne({ email: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null,false,  { message: "Incorrect Email ID" });
        }
        if (!bcrypt.compareSync(password, user.password)) {

          return done(null,false, { message: "Incorrect Password" });

        }
        return done(null, user);
      });
    }
  );
};
const sendmail=(e,m)=>{
  let mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
     port: 587,
         secure: false,  
         requireTLS: true,
     auth: {
         user: '18l236@psgtech.ac.in',
         pass: 'Raja@1234'
     }
 });
  
 let mailDetails = {
     from: '18l236@psgtech.ac.in',
     to: e,
     subject: 'OTP',
     html:`<h1>${m}</h1>`
 };
 return new Promise((resolve, reject) => {
 mailTransporter.sendMail(mailDetails, function(err, data) {
     if(err) {
         reject(err)
     } else {
       resolve({ status: 200, message: "email sent successfully" });
     }
 });})
}
const verifymail= (user) => {
  return new Promise((resolve, reject) => {
      UserModel.findOne({ email: user }, (err, user) => {
          if (user) {
            resolve({ status: 200, data: user })
          } 
          else {
            resolve({ status: 401 })
          }
      });
  });
}
const setpassword = (e) => {
  return new Promise((resolve, reject) => {
      if (e.confirmpassword !== e.password) {
          resolve({ status: 400, message: "Passwords dont match" })
      }
      UserModel.findOneAndUpdate({ email: e.email }, {password:bcrypt.hashSync(e.password, 8)}, (err, user) => {
          if (!err) {
              resolve({ status: 200, message: 'Password got resetted' });
          }
          else {
              throw err  
          }
      });
  });
}
 

module.exports = { RegisterUser, LoginUser,verifymail,sendmail,setpassword,User,UpdatUser };
