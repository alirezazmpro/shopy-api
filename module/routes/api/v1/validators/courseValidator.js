

import { check } from 'express-validator';
import Course from './../../../../models/course.js';
import Validator from './validator.js';

export default new class courseValidator extends Validator {

  handle() {

    return [
      check('title').custom(async (value) => {

        const course = await Course.findOne({ slug: this.slug(value) });

        if (course) throw new Error("چنین دوره ای قبلا با این عنوان ثبت شده است!")

      }),
      check('type')
        .not().isEmpty()
        .withMessage('فیلد نوع دوره نمیتواند خالی بماند'),

      check('body')
        .isLength({ min: 20 })
        .withMessage('متن دوره نمیتواند کمتر از 20 کاراکتر باشد'),

      check('price')
        .not().isEmpty()
        .withMessage('قیمت دوره نمیتواند خالی بماند'),

      check('tags')
        .not().isEmpty()
        .withMessage('فیلد تگ نمیتواند خالی بماند'),
    ]
  }
  slug(title) {
    return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
  }
}