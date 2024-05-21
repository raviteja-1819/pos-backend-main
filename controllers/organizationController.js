// controllers/organizationController.js

const Organization = require('../model/Organization');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

// Get organization details
exports.getOrganizationDetails = async (req, res) => {
  try {
    const organization = await Organization.findAll();
    res.json(organization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createOrganizationDetails = async (req, res) => {
  try {
    // Extract specific properties from req.body
    const { organizationName, organizationType, openingTime, closingTime } = req.body;

    // Parse and format opening and closing times
    const formattedOpeningTime = moment(openingTime, 'h:mm A').format('HH:mm:ss');
    const formattedClosingTime = moment(closingTime, 'h:mm A').format('HH:mm:ss');

    const uuid = uuidv4();
    const id = uuid.substr(0, 5);
    const organization = await Organization.create({
      id:id,
      organizationName,
      organizationType,
      openingTime: formattedOpeningTime,
      closingTime: formattedClosingTimess
    });
    res.status(201).json({ message: 'organization created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update organization details
exports.updateOrganizationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { organizationName, organizationType, openingTime, closingTime } = req.body;

    // Parse and format opening and closing times
    const formattedOpeningTime = moment(openingTime, 'h:mm A').format('HH:mm:ss');
    const formattedClosingTime = moment(closingTime, 'h:mm A').format('HH:mm:ss');
    const [updated] = await Organization.update({
      organizationName,
      organizationType,
      openingTime: formattedOpeningTime,
      closingTime: formattedClosingTime
    }, { where: { id } });
    
    if (updated) {
      const updatedOrganization = await Organization.findByPk(id);
      return res.status(200).json({ message: 'updated successfully' });
    }
    throw new Error('Organization not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//delete an organization
exports.deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Organization.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: 'deleted successfully' });
      }
      throw new Error('Organization not found');
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
        };