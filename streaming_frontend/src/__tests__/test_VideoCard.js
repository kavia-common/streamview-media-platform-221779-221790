import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoCard from '../components/VideoCard';

test('renders VideoCard and handles click', () => {
  const onClick = jest.fn();
  render(<VideoCard video={{ id: 1, title: 'Clip', thumbnail: '', categories: [] }} onClick={onClick} />);
  expect(screen.getByText('Clip')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Clip'));
  expect(onClick).toHaveBeenCalled();
});
