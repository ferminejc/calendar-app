import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const fetchAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const addAppointment = (appointment: any) => api.post('/appointments', appointment);
export const updateAppointment = (id: number, updatedFields: any) => api.patch(`/appointments/${id}`, updatedFields);
export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);
