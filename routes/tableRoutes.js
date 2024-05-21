// tableRoutes.js
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/create', tableController.table);
router.get('/tables', tableController.getTables);
router.get('/table/:table_id',tableController.getTableById);
router.get('/tables/:status',tableController.getTablesByStatus);
router.put('/table/:table_id',tableController.updateTableStatus);
router.delete('/table/:table_id',tableController.deleteTableById);

module.exports = router;
