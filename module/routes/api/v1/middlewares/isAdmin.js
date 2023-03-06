


export const isAdmin=(req,res,next)=>{

  if(req.user.admin===true){
    return next();
  }

  return res.status(403).json({
    status:'fail',
    message:'شما اجازه دسترسی به این روت رو ندارید!'
  });

}