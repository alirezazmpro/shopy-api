import autoBind from 'auto-bind';
import { validationResult } from 'express-validator';
export default class controller {
  
  constructor(){
    autoBind(this);
  }

  validationData(req,res){
    const result=validationResult(req);

    if(!result.isEmpty()){
      const errors=result.array();
      const messages=[];
      errors.forEach(err=>messages.push(err.msg));

      res.status(422).json({
        status:'fail',
        messages
      });
      return true;
    }
    return false;
  }

}