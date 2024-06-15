import AppointmentItem from './AppointmentItem';

interface Appointment {
  id: number;
  name: string;
  date: string;
  status: string;
}

const AppointmentList = ({ appointments, onUpdateStatus, onEdit, onDelete }: { appointments: Appointment[], onUpdateStatus: (appointment: Appointment) => void, onEdit: (appointment: Appointment) => void, onDelete: (id: number) => void }) => {
  return (
    <div>
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          onUpdateStatus={onUpdateStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
