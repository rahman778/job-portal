const path = require('path');

const allowedExtensions = {
   image: [".jpg", ".jpeg"],
   cv: [".pdf", ".docx", ".doc"],
};

const fileFilter = (allowedKey) => (req, res, next) => {
   // console.log('first', req.file)
   //const { fieldname } = req;

   console.log('fieldname', fieldname)
   const imageUrl = req.file;

   console.log('imageUrl11', imageUrl)

  

   const allowedExts = allowedExtensions[allowedKey];
   const extname = path.extname(req.file.originalname).toLowerCase();

   if (!allowedExts.includes(extname)) {
      return res
         .status(400)
         .json({
            message: `Invalid file type for ${fieldname}. Only these extensions are allowed: ${allowedExts.join(
               ", "
            )}`,
         });
   }

   next();
};

module.exports = fileFilter;
