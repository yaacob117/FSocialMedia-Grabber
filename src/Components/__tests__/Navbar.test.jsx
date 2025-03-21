import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Check if the logo text is rendered
    expect(screen.getByText('Social-Retriever')).toBeDefined();
    
    // Check if navigation links are present
    expect(screen.getByTitle('Home')).toBeDefined();
    expect(screen.getByTitle('Chat')).toBeDefined();
    expect(screen.getByTitle('Profile')).toBeDefined();
    expect(screen.getByTitle('Sign Out')).toBeDefined();
  });
});