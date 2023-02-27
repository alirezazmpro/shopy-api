import controller from "../../../controller.js";
import User from "../../../../models/user.js";
import userTransform from "../../../../transforms/v1/userTransform.js";

export default new class authController extends controller {

  async register(req, res, next) {
    try {
      if (await this.RecaptchaVrify(req, res, next)) return;
      if (this.validationData(req, res)) return;

      const user = await User.findOne({ email: req.body.email });

      if (user) return res.status(422).json({
        status: 'fail',
        message: 'چنین کاربری قبلا در سایت ثبت شده است'
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      newUser.save();

      const data=new userTransform().transform(newUser,true);

      res.cookie("pro_token",data.token,{
        httpOnly:true,
        maxAge:(3600*24*10),
        path:"/"
      }).status(200).json({
        status:'success',
        user:data
      })


    } catch (err) {
      next(err);
    }
  }
  async login(req, res, next) {
    try {

      if(await this.RecaptchaVrify(req,res,next)) return;
      if(this.validationData(req,res))return;

      const user = await User.findOne({ email: req.body.email });

      if (!user || !user.comparePassword(req.body.password)) return res.status(422).json({
        status: 'fail',
        message: 'اطلاعات وارد شده مطابقت ندارد!'
      });


      const data=new userTransform().transform(user,true);

      res.cookie("pro_token",data.token,{
        httpOnly:true,
        maxAge:(3600*24*10),
        path:"/"
      }).status(200).json({
        status:'success',
        user:data
      })



    } catch (err) {
      next(err);
    }
  }
}