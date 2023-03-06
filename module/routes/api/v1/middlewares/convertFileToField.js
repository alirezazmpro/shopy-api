
export default new class convertFileToField {

  handle(req , res , next) {
      if(! req.file) 
          req.body.images = undefined;
      else
          req.body.images = req.file.filename;

      next();
  }
}
