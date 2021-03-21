const mongoose = require("mongoose")
var crypto = require("crypto")
const uuidv1 = require('uuid/v1')
// const Schema = mongoose.Schema
var userSchema =  new mongoose.Schema ({
    name : {
        type:String,
        required:true,
        maxlength : 32,
        trim:true
    },
    lastname : {
        type:String,
        maxlength : 32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique : true
    },
    userinfo : {
        type:String,
        trim:true
    },
    
    encry_password:{
        type:String,   
        required:true
    },
    salt : String,
    role : {
        type:Number,
        default:0
    },
    purchases : {
        type:Array,
        default:[]
    }
}, {timestamps:true })


userSchema.virtual("password")
     .set(function(password) {
const ProductCardSchema =  new mongoose.Schema({
     product :{
         type:ObjectId,
         ref:"Product"
     },
     name:String,
     count:Number,
     price:Number
})
         this._password = password
         this.salt = uuidv1()
         console.log(this.salt)
         this.encry_password = this.securePassword(password)
        //  console.log(this.encry_password)
     })
     .get(function() {
         return this._password
     })
     

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    console.log(this.salt)
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User",userSchema)

