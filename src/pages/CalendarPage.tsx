import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAppointments from '../hooks/useAppointments';
import { addAppointment, updateAppointment, deleteAppointment } from '../api/appointments';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';
import { AxiosResponse } from 'axios';

interface Appointment {
  id?: number; // id is optional when creating a new appointment
  name: string;
  date: string;
  status: string;
}

const CalendarPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useAppointments();
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const addMutation = useMutation<AxiosResponse<any>, Error, Appointment>({
    mutationFn: (newAppointment: Appointment) => addAppointment(newAppointment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const updateMutation = useMutation<AxiosResponse<any>, Error, Appointment>({
    mutationFn: (appointment: Appointment) => updateAppointment(appointment.id!, appointment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const deleteMutation = useMutation<AxiosResponse<any>, Error, number>({
    mutationFn: (id: number) => deleteAppointment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const filteredAppointments = data?.filter((appointment: Appointment) => {
    return (
      (filter === '' || appointment.status === filter) &&
      (search === '' || appointment.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded mb-4 flex justify-between items-center">
        <div>
          <label>Status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 ml-2"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 ml-2"
          />
        </div>
      </div>
      <AppointmentForm onAdd={(appointment) => addMutation.mutate(appointment)} />
      <AppointmentList
        appointments={filteredAppointments}
        onUpdate={(appointment) => updateMutation.mutate(appointment)}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
};

export default CalendarPage;
