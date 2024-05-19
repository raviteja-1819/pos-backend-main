// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

// Routes   
const loginRoutes = require('./routes/loginRoutes');
const signupRoutes = require('./routes/signupRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const roleRoutes  = require('./routes/roleRoutes');
const tableRoutes = require('./routes/tableRoutes');

const orderRoutes = require('./routes/orderRoutes');
// Middleware
app.use(express.json());

// Routes
app.use('/api', tableRoutes);
app.use('/api', loginRoutes);
app.use('/api', signupRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', employeeRoutes);
app.use('/api', organizationRoutes);
app.use('/payment', paymentRoutes);
app.use('/api', roleRoutes);
app.use('/api', orderRoutes);

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
  
