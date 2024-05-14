// routes/organizationRoutes.js

const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// GET route to fetch organization details
router.get('/organization/details', organizationController.getOrganizationDetails);

// POST route to create organization details
router.post('/organization/details', organizationController.createOrganizationDetails);

// PUT route to update organization details
router.put('/organization/details/:id', organizationController.updateOrganizationDetails);

module.exports = router;
