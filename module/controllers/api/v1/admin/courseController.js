import Course from "../../../../models/course.js";
import courseTransform from "../../../../transforms/v1/courseTransform.js";
import controller from "../../../controller.js";

export default new class courseController extends controller{

  async index(req,res,next){
    try{
      let page=req.query.page || 1;
      const coursePaginate=await Course.paginate({},{page,limit:8,sort:{createdAt:-1}})

      res.json({
        status:'success',
        data:{
          courses:new courseTransform().transformCollection(coursePaginate.docs),
          pages:coursePaginate.pages,
          page:coursePaginate.page
        },
      
      })
    }catch(err){
      next(err);
    }
  }
}