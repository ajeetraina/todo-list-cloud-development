const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', upload.fields([{ name: 'image' }, { name: 'files' }]), createTodo);
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'files' }]), updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
