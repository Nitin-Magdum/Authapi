const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../server')
chai.should();
chai.use(chaiHttp);
describe('Auth API Testing API Testing',()=>{
    describe("1- Identify user and return response in AuthAP1", () => {
        it("return response based on email id", (done) => {
            const id="rajadhurai322@gmail.com"
            chai.request(app)
            .get("/api/v1/getregister/"+id)
                .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   const obj = res.body;
                   Object.keys(obj).length.should.be.eql(6);
                    done();
                });
        });
    })
    it("update response based on email id", (done) => {
        const id="rajadhurai322@gmail.com"
        chai.request(app)
        .put("/api/v1/getuserupdate/"+id)
            .end((err, res) => {
               res.should.have.status(200);
               res.should.have.property('text').eql("Updated"); 
                done();
            });
    });
    it("Do register ", (done) => {
        let a={
            "firstname":"Raja",
            "lastname":"Dhurai",
            "email":"rajadhurai322@gmail.com",
            "password":"123"
        }
        chai.request(app)
        .post("/api/v1/register")
        .send(a)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('message').eql("User with specified email already exists"); 
                done();
            });
    });
    it("Not Authenticated ", (done) => {
        chai.request(app)
        .post("/api/v1/isAuthenticated")
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('isAuthenticated').eql(false); 
                done();
            });
    });
    it("Login Process ", (done) => {
        let a={
            "email":"rajadhurai@gmail.com",
            "password":"123"
        }
        chai.request(app)
        .post("/api/v1/login")
        .send(a)
            .end((err, res) => {
               res.should.have.status(401);
               res.should.have.property('text').eql("Unauthorized");  
                done();
            });
    });
    it("Forgot Password", (done) => {
        let a={
            "email":"rajadhurai322@gmail.com",
        }
        chai.request(app)
        .post("/api/v1/forgotpassword")
        .send(a)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('msg').eql("otp sent");  
                done();
            });
    });
    it("set Password", (done) => {
        let a={
            "otp":"1234",
            "password":"Raaaa",
            "confirmpassword":"Raaaaaaj"
        }
        chai.request(app)
        .post("/api/v1/setpassword")
        .send(a)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('msg').eql("Invalid OTP");  
                done();
            });
    });
    it("Logout : ", (done) => {
        let a={
            "cookie":"null",
            "passport":"null"
        }
        chai.request(app)
        .post("/api/v1/logout")
        .send(a)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.have.property('message').eql("Logout successful");  
                done();
            });
    });


})
