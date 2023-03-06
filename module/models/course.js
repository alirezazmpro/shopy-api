import mongoose  from "mongoose";
import  mongoosePaginate   from "mongoose-paginate";

const Schema=mongoose.Schema;

const courseSchema=new Schema({
  user:{type:Schema.Types.ObjectId,ref:"User"},
  title:{type:String,required:true},
  slug:{type:String,required:true},
  body:{type:String,required:true},
  type:{type:String,required:true},
  tags:{type:String,required:true},
  price:{type:String,required:true},
  images:{type:Object,required:true},
  thumb:{type:String,required:true},
  time:{type:String,default:'00:00:00'},
  viewCount:{type:Number,default:0},
  commentCount:{type:Number,default:0},
},{timestamps:true});

courseSchema.plugin(mongoosePaginate)

export default mongoose.model('Course',courseSchema);