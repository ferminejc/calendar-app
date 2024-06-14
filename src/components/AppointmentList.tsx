import React from 'react';
import AppointmentItem from './AppointmentItem';

const AppointmentList = ({ appointments, onUpdate, onDelete }: { appointments: any[], onUpdate: (appointment: any) => void, onDelete: (id: number) => void }) => {
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
