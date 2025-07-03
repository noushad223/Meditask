import { render, screen, fireEvent } from '@testing-library/react';
import Appointment from './Appointment';

describe('Appointment Component', () => {
  test('renders patient, doctor, date and time input fields', () => {
    render(<Appointment />);
  
   
    expect(screen.getByPlaceholderText(/patient name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/doctor name/i)).toBeInTheDocument();
  
    
    const dateInput = document.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
  
   
    const timeInput = document.querySelector('input[type="time"]');
    expect(timeInput).toBeInTheDocument();
  });
  

  test('can type into fields', () => {
    render(<Appointment />);
    const patientInput = screen.getByPlaceholderText(/patient name/i);
    fireEvent.change(patientInput, { target: { value: 'John Doe' } });
    expect(patientInput.value).toBe('John Doe');
  });
});
