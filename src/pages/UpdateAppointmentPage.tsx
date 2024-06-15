import UpdateAppointmentForm from "../components/UpdateAppointmentForm";
import { Appointment } from "../types";

const UpdateAppointmentPage = ({
  appointment,
  onUpdate,
  isLoading,
}: {
  appointment: Appointment;
  onUpdate: (appointment: Appointment) => void;
  isLoading: boolean;
}) => {
  return (
    <UpdateAppointmentForm
      appointment={appointment}
      onUpdate={onUpdate}
      isLoading={isLoading}
    />
  );
};

export default UpdateAppointmentPage;
