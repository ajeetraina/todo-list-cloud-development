// const Todo = require('../models/Todo');

// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ userId: req.user.userId });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createTodo = async (req, res) => {
//   const { title, description, tags } = req.body;
//   const userId = req.user.userId;

//   try {
//     const newTodo = new Todo({
//       userId,
//       title,
//       description,
//       tags: tags ? tags.split(',') : [],
//       image: req.files['image'] ? req.files['image'][0].location : null, // Use S3 URL
//       files: req.files['files'] ? req.files['files'].map(file => file.location) : [], // Use S3 URLs
//     });
//     await newTodo.save();
//     res.status(201).json(newTodo);
//   } catch (error) {
//     console.error('Error creating todo:', error); // Log full error details
//     res.status(500).json({ error: 'Failed to create the to-do. Please try again.', details: error.message });
//   }
// };

// exports.updateTodo = async (req, res) => {
//   const { title, description, tags } = req.body;

//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         tags: tags ? tags.split(',') : [],
//         image: req.files['image'] ? req.files['image'][0].location : undefined, // Use S3 URL
//         files: req.files['files'] ? req.files['files'].map(file => file.location) : undefined, // Use S3 URLs
//       },
//       { new: true }
//     );
//     res.json(updatedTodo);
//   } catch (error) {
//     console.error('Error updating todo:', error);
//     res.status(500).json({ error: 'Failed to update the to-do. Please try again.' });
//   }
// };



// exports.deleteTodo = async (req, res) => {
//   try {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Todo deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// const Todo = require('../models/Todo');
// const { S3Client } = require('@aws-sdk/client-s3');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// require('dotenv').config();

// const s3 = new S3Client({
//   endpoint: process.env.LOCALSTACK_ENDPOINT, // Localstack endpoint
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// // Multer S3 configuration
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

// exports.uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'files', maxCount: 10 }]);

// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ userId: req.user.userId });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createTodo = async (req, res) => {
//   const { title, description, tags } = req.body;
//   const userId = req.user.userId;

//   try {
//     const newTodo = new Todo({
//       userId,
//       title,
//       description,
//       tags: tags ? tags.split(',') : [],
//       image: req.files['image'] ? req.files['image'][0].location : null, // Use S3 URL
//       files: req.files['files'] ? req.files['files'].map(file => file.location) : [], // Use S3 URLs
//     });
//     await newTodo.save();
//     res.status(201).json(newTodo);
//   } catch (error) {
//     console.error('Error creating todo:', error); // Log full error details
//     res.status(500).json({ error: 'Failed to create the to-do. Please try again.', details: error.message });
//   }
// };

// exports.updateTodo = async (req, res) => {
//   const { title, description, tags } = req.body;

//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         tags: tags ? tags.split(',') : [],
//         image: req.files['image'] ? req.files['image'][0].location : undefined, // Use S3 URL
//         files: req.files['files'] ? req.files['files'].map(file => file.location) : undefined, // Use S3 URLs
//       },
//       { new: true }
//     );
//     res.json(updatedTodo);
//   } catch (error) {
//     console.error('Error updating todo:', error);
//     res.status(500).json({ error: 'Failed to update the to-do. Please try again.' });
//   }
// };

// exports.deleteTodo = async (req, res) => {
//   try {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Todo deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user.userId;

  try {
    const newTodo = new Todo({
      userId,
      title,
      description,
      tags: tags ? tags.split(',') : [],
      image: req.files['image'] ? req.files['image'][0].location : null, // Use S3 URL
      files: req.files['files'] ? req.files['files'].map(file => file.location) : [], // Use S3 URLs
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error); // Log full error details
    res.status(500).json({ error: 'Failed to create the to-do. Please try again.', details: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        tags: tags ? tags.split(',') : [],
        image: req.files['image'] ? req.files['image'][0].location : undefined, // Use S3 URL
        files: req.files['files'] ? req.files['files'].map(file => file.location) : undefined, // Use S3 URLs
      },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update the to-do. Please try again.' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
