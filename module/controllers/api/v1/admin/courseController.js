import Course from "../../../../models/course.js";
import courseTransform from "../../../../transforms/v1/courseTransform.js";
import controller from "../../../controller.js";
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
export default new class courseController extends controller {

  async index(req, res, next) {
    try {
      let page = req.query.page || 1;
      let pre_page = req.query.pre_page;
      const coursePaginate = await Course.paginate({}, {
        page, limit: pre_page, sort: { createdAt: -1 }, populate: [{
          path: 'user',
        }]
      })


      res.json({
        status: 'success',
        data: {
          courses: new courseTransform().withUser().transformCollection(coursePaginate.docs),
          pages: coursePaginate.pages,
          page: coursePaginate.page
        }
      })
    } catch (err) {
      next(err);
    }
  }
  store(req, res, next) {
    try {

      if (this.validationData(req, res)) {
        if (req.file)
          fs.unlinkSync(req.file.path);
        return;
      }
      let images = this.ResizeImage(req.file);

      let { title, body, tags, price, type } = req.body;

      const newCourse = new Course({
        user: req.user,
        title,
        slug: this.slug(title),
        body,
        tags,
        images,
        thumb: images[360],
        price,
        type
      });

      newCourse.save();
      res.status(200).json({
        success: true,
        message: 'The courese has been created!'
      });
    } catch (err) {
      next(err)
    }
  }

  async destroy(req, res, next) {
    try {

      this.hasMongoID(res, req.params.id);

      const course = await Course.findById(req.params.id);
      if (!course) this.error(res, 404, 'دوره مورد نطر یافت نشد');

      // remove episodes

      // delete Images
      Object.values(course.images).forEach(image => fs.unlinkSync(`./public${image}`));

      //delete courses
      course.remove();

      res.status(200).json({
        status:'success',
        message:'The course has been deleted!'
      })


    } catch (err) {
      next(err);
    }
  }
  ResizeImage(image) {
    let imageInfo = path.parse(image.path);
    let addressImages = {};

    addressImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);


    let resize = size => {
      let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
      addressImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);

      sharp(image.path).resize(size, null)
        .toFile(`${image.destination}/${imageName}`);
    }


    [360, 480, 720, 1080].map(resize);

    return addressImages;
  }
  getUrlImage(dir) {
    return dir.substring(8);
  }
}