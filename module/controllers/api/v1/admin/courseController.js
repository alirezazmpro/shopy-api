import Course from "../../../../models/course.js";
import courseTransform from "../../../../transforms/v1/courseTransform.js";
import controller from "../../../controller.js";
import path from 'path';
import fs from 'fs';
import sharp  from 'sharp';
export default new class courseController extends controller{

  async index(req,res,next){
    try{
      let page=req.query.page || 1;
      const coursePaginate=await Course.paginate({},{page,limit:2,sort:{createdAt:-1},populate:[{
        path:'user',
      }]})

     
      res.json({
        status:'success',
        data:{
          courses:new courseTransform().withUser().transformCollection(coursePaginate.docs),
          pages:coursePaginate.pages,
          page:coursePaginate.page
        }
      })
    }catch(err){
      next(err);
    }
  }
  store(req,res,next){
    try{
      
      if(this.validationData(req,res)){
        if(req.file)
            fs.unlinkSync(req.file.path);
        return;
      }
      let images=this.ResizeImage(req.file);

      let {title,body,tags,price,type}=req.body;

      const newCourse=new Course({
        user:req.user,
        title,
        slug:this.slug(title),
        body,
        tags,
        images,
        thumb:images[360],
        price,
        type
      });

      newCourse.save();
      res.status(200).json({
        success:true,
        message:'The courese has been created!'
      });
    }catch(err){
      next(err)
    }
  }
  ResizeImage(image){
    let imageInfo=path.parse(image.path);
    let addressImages={};

    addressImages['original']=this.getUrlImage(`${image.destination}/${image.filename}`);


    let resize=size=>{
      let imageName=`${imageInfo.name}-${size}${imageInfo.ext}`;
      addressImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);

      sharp(image.path).resize(size,null)
      .toFile(`${image.destination}/${imageName}`);
    }


    [360,480,720,1080].map(resize);

    return addressImages;
  }
  getUrlImage(dir){
    return dir.substring(8);
  }
}