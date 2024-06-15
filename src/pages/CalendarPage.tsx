import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Routes, Route } from 'react-router-dom';
import useAppointments from '../hooks/useAppointments';
import { updateAppointment, deleteAppointment } from '../api/appointments';
import AppointmentList from '../components/AppointmentList';
import { AxiosResponse } from 'axios';
import UpdateAppointmentPage from './UpdateAppointmentPage';

interface Appointment {
  id: number;
  name: string;
  date: string;
  status: string;
}

const CalendarPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading: isAppointmentsLoading, error } = useAppointments();
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const updateMutation = useMutation<AxiosResponse<any>, Error, Appointment>({
    mutationFn: (appointment: Appointment) => updateAppointment(appointment.id, appointment),
    onMutate: () => setIsListLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setIsListLoading(false);
      navigate('/calendar');
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

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    navigate(`/calendar/update/${appointment.id}`);
  };

  const handleUpdateStatus = (appointment: Appointment) => {
    updateMutation.mutate(appointment);
  };

  const filteredAppointments = data?.filter((appointment: Appointment) => {
    return (
      (filter === '' || appointment.status === filter) &&
      (search === '' || appointment.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const sortedAppointments = filteredAppointments?.sort((a: Appointment, b: Appointment) => {
    if (sortOrder === 'asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  if (isAppointmentsLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
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
                  <div>
                    <label>Sort by Date</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="border p-2 ml-2"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => navigate('/add')} className="bg-green-500 text-white p-2 rounded mb-4 w-full">
                    Add Appointment
                  </button>
                {isListLoading ? (
                  <div>Loading...</div>
                ) : (
                  <AppointmentList
                    appointments={sortedAppointments as Appointment[]}
                    onEdit={handleEdit}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={(id) => deleteMutation.mutate(id)}
                  />
                )}
              </>
            }
          />
          {selectedAppointment && (
            <Route
              path="update/:id"
              element={
                <UpdateAppointmentPage
                  appointment={selectedAppointment}
                  onUpdate={(appointment: Appointment) => updateMutation.mutate(appointment)}
                  isLoading={isListLoading}
                />
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default CalendarPage;
