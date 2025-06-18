
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Simulated in-memory user store (replace with DB in production)
const users = [];

const signup = async (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find(user => user.email === email);
  if (userExists) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
};

module.exports = { signup, login };
