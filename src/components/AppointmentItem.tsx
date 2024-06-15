const AppointmentItem = ({ appointment, onUpdate, onDelete }: { appointment: any, onUpdate: (appointment: any) => void, onDelete: (id: number) => void }) => {
  const toggleStatus = () => {
    const updatedStatus = appointment.status === 'Pending' ? 'Completed' : 'Pending';
    onUpdate({ ...appointment, status: updatedStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      onDelete(appointment.id);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{appointment.name}</h3>
        <p>{appointment.date}</p>
        <p>{appointment.status}</p>
      </div>
      <div>
        <button onClick={toggleStatus} className="bg-yellow-500 text-white p-2 rounded mr-2">
          {appointment.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentItem;