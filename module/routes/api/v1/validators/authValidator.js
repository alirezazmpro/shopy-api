import {check} from 'express-validator'
import validator from './validator.js'
export default new class authRouter extends validator {

  registerHandle(){
    return [
      check('name').isLength({min:3}).withMessage('فیلد نام نمی تواند کمتر از 3 کارکتر یاشد!'),
      check('email').isEmail().withMessage('فرمت فیلدذ ایمیل نادرست است'),
      check('password').isLength({min:8}).withMessage('فیلد پسورد نمیتواند کمتر از 8 کارکتر باشد')

    ]
  }
  loginHandle(){

    return [
      check('email').isEmail().withMessage('فرمت فیلدذ ایمیل نادرست است'),
      check('password').isLength({min:8}).withMessage('فیلد پسورد نمیتواند کمتر از 8 کارکتر باشد')
    ]
  }
}