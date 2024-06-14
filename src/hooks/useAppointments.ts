import { useQuery } from '@tanstack/react-query';
import { fetchAppointments } from '../api/appointments';

const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });
};

export default useAppointments;
