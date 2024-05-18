// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Get all roles
router.get('/role', roleController.getAllRoles);

// Create a new role
router.post('/role', roleController.createRole);

// Update a role
router.put('/role/:id', roleController.updateRole);

// Delete a role
router.delete('/role/:id', roleController.deleteRole);

module.exports = router;
