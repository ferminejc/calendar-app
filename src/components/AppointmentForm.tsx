import React, { useState } from 'react';

const AppointmentForm = ({ onAdd, isLoading }: { onAdd: (appointment: any) => void, isLoading: boolean }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; date?: string } = {};
    if (!name) newErrors.name = 'Name is required';
    if (!date) newErrors.date = 'Date is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({ name, date, status });
    setName('');
    setDate('');
    setStatus('Pending');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded mb-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          disabled={isLoading}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full" disabled={isLoading}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;