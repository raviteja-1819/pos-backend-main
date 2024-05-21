// routes/organizationRoutes.js

const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// GET route to fetch organization details
router.get('/organizations', organizationController.getOrganizationDetails);

// POST route to create organization details
router.post('/organization', organizationController.createOrganizationDetails);

// PUT route to update organization details
router.put('/organization/:id', organizationController.updateOrganizationDetails);
// delete route
router.delete('/organization/:id', organizationController.deleteOrganization);

module.exports = router;
