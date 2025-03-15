const mongoose=require('mongoose')

const userSchema =new mongoose.Schema({
  fullName:{
    type:String,
    required:true
  },
  userName:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  dob:{
    type: Date,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  profilePicture:{
    type:String,
    required:true
  }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);