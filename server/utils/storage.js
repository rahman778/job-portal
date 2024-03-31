const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");

const keys = require("../config/keys");

const { accessKeyId, secretAccessKey, region, bucketName } = keys.aws;

const allowedExtensions = {
   image: [".jpg", ".jpeg", ".png"],
   application: [".pdf", ".docx", ".doc"],
};

const getDirectory = (file) => {
   const fileType = file.mimetype.split("/")[0];

   switch (fileType) {
      case "image":
         return "uploads/images/";
      case "application":
         return "uploads/docs/";
      default:
         return "uploads/others/";
   }
};

const s3 = new S3Client({
   credentials: {
      accessKeyId,
      secretAccessKey,
   },
   region,
});

const s3Storage = multerS3({
   s3: s3,
   bucket: bucketName,
   acl: "public-read",
   metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
   },
   key: (req, file, cb) => {
      const fileName = Date.now() + "_" + file.originalname;
      const fullPath = getDirectory(file) + fileName;
      cb(null, fullPath);
   },
});

function sanitizeFile(file, cb) {
   const allowedKey = file.mimetype.split("/")[0];

   const allowedExts = allowedExtensions[allowedKey];
   const extname = path.extname(file.originalname).toLowerCase();

   if (allowedExts.includes(extname)) {
      return cb(null, true); // no errors
   } else {
      cb("Error: File type not allowed!");
   }
}

const uploadImage = multer({
   storage: s3Storage,
   fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback);
   },
   limits: {
      fileSize: 1024 * 1024 * 2, // 2mb file size
   },
});

module.exports = uploadImage;
