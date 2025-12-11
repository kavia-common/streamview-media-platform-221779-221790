import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoModal from '../components/VideoModal';

test('renders modal with video source and closes', () => {
  const onClose = jest.fn();
  render(<VideoModal video={{ id: 7, title: 'Test Video' }} onClose={onClose} />);
  const videoEl = screen.getByTestId('video-player');
  expect(videoEl).toBeInTheDocument();

  // Close via button or overlay
  const closeBtn = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeBtn);
  expect(onClose).toHaveBeenCalled();
});
