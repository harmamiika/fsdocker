import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { expect } from 'vitest';
import { Todo } from './Todo';

const testTodo = {
  text: 'Test Todo',
  done: false,
};

test('test test', () => {
  expect(1).toBe(1);
});

test('Renders the todo text', () => {
  const { getByText } = render(<Todo todo={testTodo} deleteTodo={() => {}} completeTodo={() => {}} />);
  expect(getByText('Test Todo')).toBeInTheDocument();
});
