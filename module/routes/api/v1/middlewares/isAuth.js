
import jwt from 'jsonwebtoken';
import User from '../../../../models/user.js';
export const isAuth=async (req,res,next)=>{
  
  let token= req.cookies.pro_token;
  
  if(!token){
    return res.status(403).json({
      status:'fail',
      message:'توکنی یافت نشد!'
    });

    
  }

  try{

    const decoded=await jwt.verify(token,process.env.JWT_KEY);

    const user=await User.findById(decoded.user_id);

    if(user){
     req.user=user;
      next(); 
    }else{
      res.status(403).json({
        status:'fail',
        message:'توکن اعتبار ندارد!'
      })
    }



  }catch(err){
    return res.status(403).json({
      status:'fail',
      message:"اعتبار توکن به پایان رسیده است"
    })
  }



}