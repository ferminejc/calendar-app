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
  const { data, isLoading: isAppointmentsLoading, error } = useAppointments();
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);

  const addMutation = useMutation<AxiosResponse<any>, Error, Appointment>({
    mutationFn: (newAppointment: Appointment) => addAppointment(newAppointment),
    onMutate: () => setIsFormLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setIsFormLoading(false);
    },
    onError: () => setIsFormLoading(false),
  });

  const updateMutation = useMutation<AxiosResponse<any>, Error, Appointment>({
    mutationFn: (appointment: Appointment) => updateAppointment(appointment.id!, appointment),
    onMutate: () => setIsListLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setIsListLoading(false);
    },
    onError: () => setIsListLoading(false),
  });

  const deleteMutation = useMutation<AxiosResponse<any>, Error, number>({
    mutationFn: (id: number) => deleteAppointment(id),
    onMutate: () => setIsListLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setIsListLoading(false);
    },
    onError: () => setIsListLoading(false),
  });

  const filteredAppointments = data?.filter((appointment: Appointment) => {
    return (
      (filter === '' || appointment.status === filter) &&
      (search === '' || appointment.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  if (isAppointmentsLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4">
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
        <AppointmentForm onAdd={(appointment) => addMutation.mutate(appointment)} isLoading={isFormLoading} />
        {isListLoading ? (
          <div>Loading...</div>
        ) : (
          <AppointmentList
            appointments={filteredAppointments}
            onUpdate={(appointment) => updateMutation.mutate(appointment)}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;