import React, { useState } from 'react';

const AppointmentForm = ({ onAdd }: { onAdd: (appointment: any) => void }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, date, status });
    setName('');
    setDate('');
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
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Add Appointment</button>
    </form>
  );
};

export default AppointmentForm;
