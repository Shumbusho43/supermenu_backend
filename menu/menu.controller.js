const { Menu, menuValidationSchema } = require('./menu.model');

// Controller for creating a new menu item
async function createMenu(req, res) {
  try {
    const { name, description, price } = req.body;

    // Validate the menu data using Joi
    const { error } = menuValidationSchema.validate({ name, description, price });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new menu item
    const menu = new Menu({ name, description, price });

    // Save the menu item to the database
    const savedMenu = await menu.save();

    return res.status(201).json(savedMenu);
  } catch (error) {
    console.error('Error creating menu:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// Controller for getting all menu items
async function getAllMenus(req, res) {
  try {
    // Retrieve all menu items from the database
    const menus = await Menu.find();

    return res.status(200).json(menus);
  } catch (error) {
    console.error('Error getting menus:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

// Controller for getting a menu item by ID
async function getMenuById(req, res) {
  try {
    const { id } = req.params;

    // Find the menu item by ID in the database
    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    return res.status(200).json(menu);
  } catch (error) {
    console.error('Error getting menu by ID:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createMenu, getAllMenus, getMenuById };
