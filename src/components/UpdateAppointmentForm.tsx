import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: number;
  name: string;
  date: string;
  status: string;
}

const UpdateAppointmentForm = ({
  appointment,
  onUpdate,
  isLoading,
}: {
  appointment: Appointment;
  onUpdate: (appointment: Appointment) => void;
  isLoading: boolean;
}) => {
  const [name, setName] = useState(appointment.name);
  const [date, setDate] = useState(appointment.date);
  const [status, setStatus] = useState(appointment.status);
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    setName(appointment.name);
    setDate(appointment.date);
    setStatus(appointment.status);
  }, [appointment]);

  const validate = () => {
    const newErrors: { name?: string; date?: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!date) newErrors.date = "Date is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onUpdate({ ...appointment, name, date, status });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4">
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white shadow-md rounded mb-4"
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
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
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>
          <div>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 w-full"
              disabled={isLoading}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Appointment"}
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="bg-gray-400 ml-4 text-white p-2 rounded mb-4"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointmentForm;
