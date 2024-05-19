// tableRoutes.js
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/create', tableController.table);
router.get('/tables', tableController.getTables);
router.get('/table',tableController.getTableById);
router.get('/table',tableController.getTablesByStatus);
router.put('/table',tableController.updateTableStatus);
router.delete('/table',tableController.deleteTableById);

module.exports = router;
