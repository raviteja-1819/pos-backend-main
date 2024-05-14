// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();

app.use(bodyParser.json());

// Routes   
const loginRoutes = require('./routes/loginRoutes');
const signupRoutes = require('./routes/signupRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const employeeRoutes = require('./routes/employeeroutes');
const organizationRoutes = require('./routes/organizationRoutes');
app.use('/api', loginRoutes);
app.use('/api', signupRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', employeeRoutes);
app.use('/api', organizationRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database synchronization
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    // Start server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Database synchronization failed:', err);
  });
