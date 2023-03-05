import controller from "../../../controller.js";



export default new class adminController  extends  controller {

  index(req,res){
    res.json({
      message:'admin page'
    })
  }
}