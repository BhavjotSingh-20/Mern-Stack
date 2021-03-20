var express = require("express")
var router = express.Router()
const {check} = require("express-validator")
const {signout,signup,signin} = require("../controllers/auth") 


router.post("/signup",[
check("name").isLength({min:3}).withMessage("name should be at least 3 char"),
check("email").isEmail().withMessage("Not an email"),
check("password","password should be at least 3 char").isLength({min:3}),
],signup)



router.post("/signin",[
check("email").isEmail().withMessage("Not an email"),
check("password","password should be at least 3 char").isLength({min:3}),
],signin)


router.get("/signout",signout)

module.exports = router