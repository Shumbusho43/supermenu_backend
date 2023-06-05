const {
  User,
  userValidationSchema
} = require('./user.models'); // Assuming your User model is defined in a separate file
const jwt = require("jsonwebtoken")
exports.signupController = async (req, res) => {
  try {
    // Validate request body against the Joi schema
    const {
      error
    } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    const {
      fullName,
      phoneNumber,
      email,
      password
    } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }


    // Create a new user
    const newUser = new User({
      fullName,
      phoneNumber,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();
    // Create a new object without the password field
    const newUserWithoutPassword = {
      fullName: newUser.fullName,
      phoneNumber: newUser.phoneNumber,
      email: newUser.email
    };

    return res.status(201).json({
      message: 'Signup successful',
      data: newUserWithoutPassword
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}

exports.loginController = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Find the user by email
    const user = await User.findOne({
      email
    })
    if (!user) {
      return res.status(400).json({
        error: 'Invalid credentials'
      });
    }

    // Compare the password
    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: 'Invalid credentials'
      });
    }

    // Password is valid, authentication successful
    const token = generateToken(user);
    res.cookie('token', "Bearer " + token, {
      httpOnly: true
    });
    return res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}
//generate jwt token function
const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role
  }, process.env.SECRET_KEY, {
    expiresIn: '30d'
  });
}