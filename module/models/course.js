import mongoose  from "mongoose";


const Schema=mongoose.Schema;

const courseSchema=new Schema({
  user:{type:Schema.Types.ObjectId,ref:"User"},
  title:{type:String,required:true},
  body:{type:String,required:true},
  type:{type:String,required:true},
  price:{type:String,required:true},
  images:{type:String,required:true},
  thumb:{type:String,required:true},
  time:{type:String,default:'00:00:00'},
  viewCount:{type:Number,default:0},
  commentCount:{type:Number,default:0},
},{timestamps:true});


export default mongoose.model('Course',courseSchema);