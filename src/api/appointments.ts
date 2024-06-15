import axios from 'axios';

const api = axios.create({
  baseURL: 'https://json-server-vercel-beta-ten.vercel.app',
});

export const fetchAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const addAppointment = (appointment: any) => api.post('/appointments', appointment);
export const updateAppointment = (id: number, updatedFields: any) => api.patch(`/appointments/${id}`, updatedFields);
export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);