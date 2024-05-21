// controllers/roleController.js

const Role = require('../model/Role');
const { uuid } = require('uuid');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new role
const { v4: uuidv4 } = require('uuid');

exports.createRole = async (req, res) => {
    const { name, description } = req.body;
    console.log(req.body);
    const uuid = uuidv4();
    const id = uuid.substr(0, 4); // Extract the first 4 characters of the UUID
    try {
        const role = await Role.create({
            name: name,
            description: description,
            id: id 
        });
        res.status(201).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update a role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.update({ name, description });
    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.destroy();
    res.status(204).json({ error: 'role deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
