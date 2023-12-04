const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Dhwaneel:Dhwaneel9913.@cluster0.2ftw4cd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String
});
const Employee = mongoose.model('Employee', EmployeeSchema);

app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post('/api/employees', async (req, res) => {
  const newEmployee = new Employee(req.body);
  const savedEmployee = await newEmployee.save();
  res.json(savedEmployee);
});

app.get('/api/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.put('/api/employees/:id', async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  app.delete('/api/employees/:id', async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  

  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
