import autoBind from 'auto-bind';
import { validationResult } from 'express-validator';
import axios from 'axios';
export default class controller {

  constructor() {
    autoBind(this);
  }

  validationData(req, res) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach(err => messages.push(err.msg));

      res.status(422).json({
        status: 'fail',
        messages
      });
      return true;
    }
    return false;
  }

  async RecaptchaVrify(req, res, next) {

    try {


      if(!req.body.reToken){
         res.status(404).json({
          status:'fail',
          message:'توکن ریکپجا یافت نشد'
        })
        return true;
      }
     

      const response=await axios.post(`https://www.google.com/recaptcha/api/siteverify?response=${req.body.reToken}&secret=${process.env.RECAPTCHA_SECRETKEY}`);
     

      if(!response.data.success){
        res.status(422).json({
          status:'fail',
          message:"توکن ریکپجا اعتبار ندارد"
        });
        return true;
      }
      return false;

    } catch (err) {
      next(err);
    }
  }

}