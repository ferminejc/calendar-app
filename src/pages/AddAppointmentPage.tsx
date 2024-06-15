import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addAppointment } from '../api/appointments';
import { AxiosResponse } from 'axios';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../types';

const AddAppointmentPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const addMutation = useMutation<AxiosResponse<any>, Error, Appointment>({
    mutationFn: (newAppointment: Appointment) => addAppointment(newAppointment),
    onMutate: () => setIsFormLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setIsFormLoading(false);
      navigate('/calendar');
    },
    onError: () => setIsFormLoading(false),
  });

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4">
        <button onClick={() => navigate('/calendar')} className="bg-gray-500 text-white p-2 rounded mb-4">
          Back
        </button>
        <AppointmentForm onAdd={(appointment) => addMutation.mutate(appointment)} isLoading={isFormLoading} />
      </div>
    </div>
  );
};

export default AddAppointmentPage;
