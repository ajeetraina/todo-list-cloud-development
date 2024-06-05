import React from 'react';
import { Container, Box } from '@mui/material';
import TodoList from '../components/TodoList';

const TodoPage = () => (
  <Container>
    <Box sx={{ mt: 8 }}>
      <TodoList />
    </Box>
  </Container>
);

export default TodoPage;
