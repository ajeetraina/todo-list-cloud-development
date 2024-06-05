import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Box, List, ListItem, ListItemText, Alert } from '@mui/material';
import axios from '../services/api';

const AddEditTodo = ({ fetchTodos, editingTodo, setEditingTodo }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setTags(editingTodo.tags.join(', '));
      setImagePreview(editingTodo.image ? editingTodo.image : null);
      setFilePreviews(editingTodo.files.map(file => ({ name: file.split('/').pop(), url: file })));
      setOpen(true);
    }
  }, [editingTodo]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFilesUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
    setFilePreviews(uploadedFiles.map(file => ({ name: file.name, url: URL.createObjectURL(file) })));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    if (image) formData.append('image', image);
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      if (editingTodo) {
        // Update existing todo
        const response = await axios.put(`/todos/${editingTodo._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Todo updated:', response.data);
      } else {
        // Create new todo
        const response = await axios.post('/todos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Todo saved:', response.data);
      }

      fetchTodos();
      setOpen(false);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error saving todo:', error);
      setError('Failed to save the to-do. Please try again.');
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add To-Do
      </Button>
      <Modal open={open} onClose={() => { setOpen(false); setEditingTodo(null); }}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, width: 400, margin: 'auto', mt: 5 }}>
          <h2>{editingTodo ? 'Edit To-Do' : 'Add To-Do'}</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box className="upload-buttons" sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mb: 2 }}>
            <Button
              variant="contained"
              component="label"
            >
              Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            <Button
              variant="contained"
              component="label"
            >
              Upload Files
              <input type="file" hidden multiple onChange={handleFilesUpload} />
            </Button>
          </Box>
          {imagePreview && (
            <Box sx={{ mb: 2 }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
            </Box>
          )}
          <List>
            {filePreviews.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            {editingTodo ? 'Update' : 'Save'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditTodo;
