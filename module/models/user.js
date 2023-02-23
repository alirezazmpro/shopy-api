

import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  admin:{type:Boolean,default:false}
},{timestamps:true});


userSchema.pre('save',function(next){
  const salt=bcrypt.genSaltSync();
  const hash=bcrypt.hashSync(this.password,salt);
  this.password=hash;
  next();
})

userSchema.methods.comparePassword=function(password){

  return bcrypt.compareSync(password,this.password);
}
export default mongoose.model('User',userSchema);