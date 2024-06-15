# Calendar Appointment App

This is a Calendar Appointment App built with React, TailwindCSS, and React Query. The app allows users to log in, view, add, update, delete, filter, search, and sort appointments.

## Features

- User Authentication (Mock Login)
- View All Appointments
- Add New Appointments
- Update Appointment Status
- Delete Appointments with Confirmation
- Filter Appointments by Status
- Search Appointments by Name
- Sort Appointments by Date (Ascending/Descending)
- Loading Indicators for HTTP Requests
- Form Validation

## Technologies Used

- React
- React Router
- React Query
- Axios
- TailwindCSS
- TypeScript

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ferminejc/calendar-app.git
    cd calendar-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the JSON Server (Mock API):
    ```bash
    npx json-server --watch db.json --port 5000
    ```

4. Start the React application:
    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.

2. Log in using the mock credentials:
    - Email: `guest@email.com`
    - Password: `Pass123`

3. Once logged in, you can:
    - View all appointments.
    - Add new appointments by filling out the form and clicking "Add Appointment".
    - Update the status of an appointment by clicking "Mark as Completed" or "Mark as Pending".
    - Delete an appointment by clicking "Delete" and confirming the action.
    - Filter appointments by status using the dropdown menu.
    - Search appointments by name using the search input.
    - Sort appointments by date using the sort dropdown.

## Project Structure

```plaintext
src/
├── api/
│   └── appointments.ts
├── components/
│   ├── AppointmentForm.tsx
│   ├── AppointmentItem.tsx
│   └── AppointmentList.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAppointments.ts
├── pages/
│   ├── CalendarPage.tsx
│   ├── LoginPage.tsx
├── App.tsx
├── index.tsx
├── App.css
└── index.css