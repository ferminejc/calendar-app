import React from 'react';
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <div>
      <AppointmentForm onAdd={(appointment) => addMutation.mutate(appointment)} />
      <AppointmentList
        appointments={data}
        onUpdate={(appointment) => updateMutation.mutate(appointment)}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
};

export default CalendarPage;