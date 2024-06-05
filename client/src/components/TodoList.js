import React, { useEffect, useState } from 'react';
import { List, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from '../services/api';
import TodoItem from './TodoItem';
import AddEditTodo from './AddEditTodo';
import Logout from './Logout';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/todos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos(response.data);
      const allTags = [...new Set(response.data.flatMap(todo => todo.tags))];
      setTags(allTags);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || todo.tags.includes(selectedTag))
    );
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Logout />
      <Box className="search-filter" sx={{ mb: 2 }}>
        <TextField
          className="search-field"
          placeholder="Search Todos"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FormControl className="filter-field">
          <InputLabel>Filter by Tag</InputLabel>
          <Select value={selectedTag} onChange={handleTagChange}>
            <MenuItem value=""><em>None</em></MenuItem>
            {tags.map((tag, index) => (
              <MenuItem key={index} value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="refresh-add-buttons">
        <Button variant="contained" color="primary" onClick={fetchTodos}>
          Refresh
        </Button>
        <AddEditTodo fetchTodos={fetchTodos} editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
      </Box>
      <List>
        {filteredTodos.map((item) => (
          <TodoItem key={item._id} todo={item} fetchTodos={fetchTodos} setEditingTodo={setEditingTodo} />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
