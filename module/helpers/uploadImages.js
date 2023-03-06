
import multer from 'multer';
import mkdirp from 'mkdirp';
import fs from 'fs';
const getUrlImage = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDay();


  return `./public/uploads/images/courses/${year}/${month}/${day}`;
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {

    let dir = getUrlImage();
    mkdirp(dir, (err) => cb(null, dir))

  },
  filename: (req, file, cb) => {
    let filePath = getUrlImage() + '/' + file.originalname;
    if (!fs.existsSync(filePath))
      cb(null, file.originalname);
    else
      cb(null, Date.now() + '-' + file.originalname);

  }
})


const uploadImage = multer({
  storage: imageStorage,
  
});


export default uploadImage;