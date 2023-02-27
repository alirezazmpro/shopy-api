import userTransform from "../../../transforms/v1/userTransform.js"
import controller from "../../controller.js"



export default new class userController extends controller {

  index(req,res,next){

    res.json({
      success:'true',
      user:new userTransform().transform(req.user)
    })
  }
  
}