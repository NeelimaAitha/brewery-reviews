// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Assuming you have a config file for Sequelize
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation
const { User, Brewery, Review } = require('./models'); // Import your Sequelize models
const userRoutes = require('./routes/userRoutes');
const breweryRoutes = require('./routes/breweryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/breweries', breweryRoutes);
app.use('/api/reviews', reviewRoutes);

// Routes

// Signup route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Failed to signup' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});

// Search breweries route
app.get('/api/search', async (req, res) => {
  const { by_city, by_name, by_type } = req.query;
  let query = `https://api.openbrewerydb.org/breweries?`;

  if (by_city) query += `by_city=${by_city}&`;
  if (by_name) query += `by_name=${by_name}&`;
  if (by_type) query += `by_type=${by_type}&`;

  try {
    const response = await axios.get(query);
    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      message: 'Search failed. Please try again later.',
    });
  }
});

// Add review route
app.post('/api/reviews', async (req, res) => {
  const { brewery_id, user_id, rating, description } = req.body;

  try {
    const newReview = await Review.create({
      brewery_id,
      user_id,
      rating,
      description,
    });

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Error in adding review:', error);
    res.status(500).json({ message: 'Failed to add review' });
  }
});

// Sync Sequelize with the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
