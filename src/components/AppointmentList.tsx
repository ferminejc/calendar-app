import AppointmentItem from './AppointmentItem';

interface Appointment {
  id: number;
  name: string;
  date: string;
  status: string;
}

const AppointmentList = ({ appointments, onUpdate, onDelete }: { appointments: Appointment[], onUpdate: (appointment: Appointment) => void, onDelete: (id: number) => void }) => {
  return (
    <div>
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
