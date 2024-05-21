const moment = require('moment');
const Table = require('../model/Table');
const { v4: uuidv4 } = require('uuid'); 

// Create a new table
exports.table = async (req, res) => {
  try {
    const { table_number, capacity, status, seating_area } = req.body;
    console.log(req.body);

    const uuid = uuidv4();
    const table_id = uuid.substr(0, 5);
  
    const table = await Table.create({
      table_number: table_number,
      capacity: capacity,
      status: status,
      seating_area: seating_area,
      table_id: table_id 
    });

    res.status(200).json({ message: 'Table created successfully', table });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all the tables 
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json({ message: 'Tables fetched successfully', tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get table details by tableId
exports.getTableById = async (req, res) => { 
  try {
    const { table_id } = req.params;
    const table = await Table.findByPk(table_id); 
    if (!table) {
      return res.status(404).json({ error: 'Table not found.' });
    }
    return res.status(200).json(table);
  } catch (error) {
    console.error('Error getting table by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get tables by it's status
exports.getTablesByStatus = async (req, res) => {
  try {
      const {status} = req.params;
      const tables = await Table.findAll({ where: {status} });
      if (tables.length === 0) {
          return res.status(404).json({ message: 'No tables found with the given status' });
      }
      res.status(200).json({ message: 'Tables fetched successfully', tables });
  } catch (error) {
      console.error('Error fetching tables by status:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
// update table by status
exports.updateTableStatus = async (req, res) => {
    try {
        const { table_id } = req.params;
        const { status } = req.body;
        const table = await Table.findByPk(table_id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found.' });
            }
            table.status = status;
            await table.save();
            res.status(200).json({ message: 'Table updated successfully', table });
            } catch (error) {
                console.error('Error updating table:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
                }
                };

// delete table by table Id
exports.deleteTableById = async (req, res) => {
    try {
        const { table_id } = req.params;
        const table = await Table.findByPk(table_id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found.' });
            }
            await table.destroy();
            res.status(200).json({ message: 'Table deleted successfully' });
            } catch (error) {
                console.error('Error deleting table:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    };
                    