const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB (or change the connection string to your preferred database)
mongoose.connect('mongodb://localhost:27017/patientdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Medication Schema and Model
const medicationSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    frequency: String
});
const Medication = mongoose.model('Medication', medicationSchema);

// Appointment Schema and Model
const appointmentSchema = new mongoose.Schema({
    doctor: String,
    date: String,
    time: String
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// POST endpoint for adding medication
app.post('/api/medications', (req, res) => {
    const { name, dosage, frequency } = req.body;

    const newMedication = new Medication({ name, dosage, frequency });
    newMedication.save()
        .then(() => res.json({ message: 'Medication added successfully!' }))
        .catch(err => res.status(400).json({ error: err }));
});

// POST endpoint for adding appointment
app.post('/api/appointments', (req, res) => {
    const { doctor, date, time } = req.body;

    const newAppointment = new Appointment({ doctor, date, time });
    newAppointment.save()
        .then(() => res.json({ message: 'Appointment added successfully!' }))
        .catch(err => res.status(400).json({ error: err }));
});

// GET endpoint for retrieving medications
app.get('/api/medications', (req, res) => {
    Medication.find()
        .then(medications => res.json(medications))
        .catch(err => res.status(400).json({ error: err }));
});

// GET endpoint for retrieving appointments
app.get('/api/appointments', (req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json({ error: err }));
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
