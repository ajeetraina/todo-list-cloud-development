// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client } = require('@aws-sdk/client-s3');
// require('dotenv').config();

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type, only images are allowed!'), false);
//     }
//   },
// });

// module.exports = upload;




// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client } = require('@aws-sdk/client-s3');
// require('dotenv').config();

// const s3 = new S3Client({
//   endpoint: process.env.LOCALSTACK_ENDPOINT, // Localstack endpoint
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type, only images are allowed!'), false);
//     }
//   },
// });

// module.exports = upload;


// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client } = require('@aws-sdk/client-s3');
// require('dotenv').config();

// const s3 = new S3Client({
//   endpoint: process.env.LOCALSTACK_ENDPOINT, // Localstack endpoint
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
//   forcePathStyle: true, // Use path-style URLs (needed for Localstack)
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|pdf/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(file.originalname.toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Invalid file type, only images and PDFs are allowed!'), false);
//     }
//   },
// });

// module.exports = upload;




const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Configure the AWS SDK to use the LocalStack endpoint and credentials
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  forcePathStyle: true,
  endpoint: process.env.LOCALSTACK_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


// Middleware to handle S3 upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
});

module.exports = upload;
