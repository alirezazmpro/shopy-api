import controller from "../../../controller.js";
import User from "../../../../models/user.js";
import userTransform from "../../../../transforms/v1/userTransform.js";

export default new class authController extends controller {

  async register(req,res,next){
    try {

      if(this.validationData(req,res))return;

      const user=await User.findOne({email:req.body.email});

      if(user) return res.status(422).json({
        status:'fail',
        message:'جنین کاربری قبلا در سایت ثبت شده است'
      })

      const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
      });

      newUser.save();

      res.status(200).json({
        status:'success',
        user:new userTransform().transform(newUser,true)
      })
      

    }catch(err){
      next(err);
    }
  }
  async login(req,res,next){
    try{

      const user=await User.findOne({email:req.body.email});

      if(!user || !user.comparePassword(req.body.password)) return res.status(422).json({
        status:'fail',
        message:'اطلاعات وارد شده مطابقت ندارد!'
      });

      res.status(422).json({
        status:'success',
        user:new userTransform().transform(user,true)
      })




    }catch(err){
      next(err);
    }
  }
}