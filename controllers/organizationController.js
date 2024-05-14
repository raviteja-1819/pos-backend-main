// controllers/organizationController.js

const Organization = require('../model/Organization');
const moment = require('moment');
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
      // Parse and format opening and closing times
      const { openingTime, closingTime, ...rest } = req.body;
      const formattedOpeningTime = moment(openingTime, 'h:mm A').format('HH:mm:ss');
      const formattedClosingTime = moment(closingTime, 'h:mm A').format('HH:mm:ss');
  
      // Create organization with formatted times
      const organization = await Organization.create({ ...rest, openingTime: formattedOpeningTime, closingTime: formattedClosingTime });
      res.status(201).json(organization);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update organization details
  exports.updateOrganizationDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const { openingTime, closingTime, ...rest } = req.body;
      const formattedOpeningTime = moment(openingTime, 'h:mm A').format('HH:mm:ss');
      const formattedClosingTime = moment(closingTime, 'h:mm A').format('HH:mm:ss');
  
      // Update organization with formatted times
      const [updated] = await Organization.update({ ...rest, openingTime: formattedOpeningTime, closingTime: formattedClosingTime }, { where: { id } });
      if (updated) {
        const updatedOrganization = await Organization.findByPk(id);
        return res.status(200).json(updatedOrganization);
      }
      throw new Error('Organization not found');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };